import economy from '../utils/Schemas/economy.js';
import { EmbedBuilder } from 'discord.js';
import type { Client, Message, User } from 'discord.js';
import type { Query, Model } from "mongoose";

export default {
    name: 'stars',
    aliases: ['bal', 'balance'],
    owner: false,
    permissions: ["SendMessages"],
    enabled: true,
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        let user: User;
         user = message.author
        const model: any = await economy.model
        const data = model.findOne({ User: user.id })
        const error = new EmbedBuilder()
        .setTitle('Error')
        .setDescription("you are not registered yet, please use `c!register` first!")
        .setColor('Red')
        if(!data) return message.channel.send({ embeds: [error] })

        const embed = new EmbedBuilder()
        .setTitle(`${user.username}'s Balance`)
        .addFields({ name: 'Stars', value: `\`\`\`\n${data.Stars}\n\`\`\`` },
                   { name: 'Tokens', value: `\`\`\`\n${data.Tokens}\n\`\`\`` },
                   { name: 'Power', value: `\`\`\`\n${data.Power}\n\`\`\`` },
                   { name: 'Hunger', value: `\`\`\`\n${data.Food}\n\`\`\`` })
        .setColor('Blue')

        message.channel.send({ embeds: [embed] })
    }
}