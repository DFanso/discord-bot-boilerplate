import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';
import config from '../config.json';

const { CLIENT_ID, TOKEN } = config;

interface Command {
  data: {
    toJSON: () => any;
  };
}

const commands: any[] = [];
const commandFoldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(commandFoldersPath, folder);

  // Check if the path is a directory before proceeding
  if (fs.statSync(commandsPath).isDirectory()) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
      const command: Command = require(path.join(commandsPath, file));
      if (command.data) {
        commands.push(command.data.toJSON());
      }
    }
  } else if (commandsPath.endsWith('.ts')) {
    // Handle files directly inside the 'commands' directory
    const command: Command = require(commandsPath);
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data: any = await rest.put(
      Routes.applicationCommands(CLIENT_ID), // Change this line for global commands
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
