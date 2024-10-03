import { Client, Events, GatewayIntentBits, CommandInteraction, Collection, ActivityType } from 'discord.js';
import fg from 'fast-glob';
import type Command from '../interfaces/command';
import { activity } from "../config.json" 
class Bot extends Client {
    public commands: Collection<string, Command> = new Collection(); 
    public async start(): Promise<void> {
        this.login(process.env.DISCORD_TOKEN);
        this.setMaxListeners(0);

        this.once(Events.ClientReady, async (c) => {
            console.log(`Logged in as ${c.user.tag}`);
            c.user.setPresence({
              activities: [{
                name: activity.name,
                type: ActivityType[activity.type as keyof typeof ActivityType],
              }],
              status: 'dnd'
            })
            const commandFiles: string[] = await fg(
                `${__dirname.replace(/\\/g, '/')}/../commands/**/*{.ts,.js}`
            );

            for (const file of commandFiles) {
                const command: Command = (await import(file)).default;
                this.commands.set(command.name, command); 
                const guild = this.guilds.cache.get(process.env.GUILD_ID!);
                if (guild) {
                    await guild.commands.create({
                        name: command.name,
                        description: command.description,
                        options: [] 
                    });
                    console.log(`Registered {/} commands`);
                } else {
                    console.error('Guild not found!');
                }
            }
            this.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isCommand()) return;

                const command = this.commands.get(interaction.commandName);
                if (!command) return;

                try {
                    await command.execute(this, interaction as CommandInteraction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    });
                }
            });
        });
    }
}

export { Bot };
