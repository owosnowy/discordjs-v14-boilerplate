import type { ApplicationCommandOptionData } from 'discord.js';

export default interface Command {
  name: string;
  description: string;
  permissions?: string;
  options?: ApplicationCommandOptionData[]; 
  execute: (client: any, interaction: any) => Promise<void>; 
}
