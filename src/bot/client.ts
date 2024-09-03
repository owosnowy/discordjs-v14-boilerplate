import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
let client = new Client({intents: [GatewayIntentBits.Guilds]});
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
class Bot extends Client {
    public async start(): Promise<void> {
this.login(process.env.DISCORD_TOKEN);
this.setMaxListeners(0);
this.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.username}`);
});
    }
}
export { Bot };