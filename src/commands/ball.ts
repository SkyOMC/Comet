import { EmbedBuilder } from 'discord.js';
import type { Client, Message } from "discord.js";
const answers: Array<string> = ["yes", "no", "maybe"];

export default {
    name: "8ball",
    owner: false,
    permissions: [],
    aliases: [],
    enabled: true,
  async execute(client: Client<true>, message: Message<true>, args: string[]) {
    const answers: Array<string> = ["yes", "no", "maybe"];
     const randomPick: string = answers[Math.floor(Math.random() * answers.length)];
     await message.reply({
         embeds: [
             new EmbedBuilder()
                 .setTitle('8ball')
                 .setDescription(`you asked for: \`${args.join(" ").replace("8ball ", "")}\`\nthe answer: ||${randomPick}||`)
                 .setColor('Random') as EmbedBuilder
         ]
     }) as Message<true>;
 }
}