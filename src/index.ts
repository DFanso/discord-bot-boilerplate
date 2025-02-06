import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from './config.json';
import connectDB from './utils/database';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN } = config;

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
const isDevelopment = process.env.NODE_ENV === 'development';
const fileExtension = isDevelopment ? '.ts' : '.js';

const eventFiles = fs
  .readdirSync(path.join(__dirname, 'events'))
  .filter((file) => file.endsWith(fileExtension));

for (const file of eventFiles) {
  const event = require(path.join(__dirname, 'events', file));
  client.on(event.name, (...args) => event.execute(...args, client));
}

connectDB(); //db connect

client.login(TOKEN);
