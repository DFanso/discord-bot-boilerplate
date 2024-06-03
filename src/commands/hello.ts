import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Hello!');
  },
};
