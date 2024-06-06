import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import User from '../models/user';
import UserService from '../services/userService';
import { UserDTO } from '../dto/userDto';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!'),
  async execute(interaction: CommandInteraction) {

    const userDTO = new UserDTO(interaction.user.username, interaction.user.id);
  
    try {
      await UserService.createUser(userDTO);
      await interaction.reply(`Hello, ${interaction.user.username}! Your data has been saved.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error saving your data.');
    }
  },
};

