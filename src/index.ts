import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from './config.json';

const { token } = config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.GuildIntegrations,
  ],
});

// Dynamically read event files
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
  const event = require(path.join(__dirname, 'events', file));
  client.on(event.name, (...args) => event.execute(...args, client));
}

client.login(token);
