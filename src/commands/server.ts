import { EmbedBuilder } from 'discord.js';
import type { Client, Message } from 'discord.js';


export default {
        name: "server",
        aliases: ["serverinfo", "si", "guild"],
        enabled: true,
    async execute(client: Client<true>, message: Message<true>, args: string[]) {
 
        const { guild } = message;
        const { name, ownerId, createdTimestamp, memberCount } = guild;
        const icon: string | null = guild.iconURL();
        const roles: number = guild.roles.cache.size;
        const emojis: number = guild.emojis.cache.size;
        const id: string = guild.id;
 
        let bVerification = guild.verificationLevel;
        let baseVerification: string = "";
 
        if (bVerification == 0) baseVerification = "None"
        if (bVerification == 1) baseVerification = "Low"
        if (bVerification == 2) baseVerification = "Medium"
        if (bVerification == 3) baseVerification = "High"
        if (bVerification == 4) baseVerification = "Very High"
 
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setThumbnail(icon)
        .setAuthor({ name: name, iconURL: icon as string })
        .setFooter({ text: `Server ID: ${id}`})
        .setTimestamp()
        .addFields({ name: "Name", value: `${name}`, inline: false})
        .addFields({ name: "Date Created", value: `${guild.createdAt}`, inline: true})
        .addFields({ name: "Server Owner", value: `<@${ownerId}>`, inline: true})
        .addFields({ name: "Server Members", value: `${memberCount}`, inline: true})
        .addFields({ name: "Role Amount", value: `${roles}`, inline: true})
        .addFields({ name: "Emoji Amount", value: `${emojis}`, inline: true})
        .addFields({ name: "Verification Level", value: `${baseVerification}`, inline: true})
        .addFields({ name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true})
 
        await message.reply({ embeds: [embed] });
    }
}