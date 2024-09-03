import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('This is a test command'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('This is a test response!');
    }
};
