import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import axios from 'axios';
import file from './index.js';
import pack from '../../package.json' assert { type: 'json' };

export default {
    name: 'bot',
    aliases: [],
    enabled: true,
    permissions: [],
    async execute(client, message, args){
        const vers = pack.dependencies;
        const dev = pack.devDependencies;
        const desc = "Comet Is a multipurpose bot with many useful features";
        const githubApiBaseUrl = 'https://api.github.com';
        const repo = 'SkyOPG/Comet';
        const response = await axios.get(`${githubApiBaseUrl}/repos/${repo}`);

        const { stargazers_count, forks_count } = response.data;
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setEmoji("1132709180084592772")
            .setStyle(ButtonStyle.Link)
            .setURL("https://github.com/SkyOPG/Comet"),
            new ButtonBuilder()
            .setCustomId("star_count")
            .setDisabled(true)
            .setEmoji("⭐")
            .setLabel(`${stargazers_count}`)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId("forks_count")
            .setDisabled(true)
            .setEmoji("🔁")
            .setLabel(`${forks_count}`)
            .setStyle(ButtonStyle.Secondary)
        );
        const embed = new EmbedBuilder()
        .setTitle('Comet Info')
        .setColor("Blue")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields({ name: "Stats", value: `> Commands: \`${file.commands.size}\`\n> Aliases: \`${file.aliases.size}\`\n> Users: \`${client.users.cache.size}\`\n> Guilds: \`${client.guilds.cache.size}\`` },
                   { name: "Versions", value: `> discord.js: ${vers["discord.js"]}\n> typescript: ${dev["typescript"]}` })
        .setDescription(`${desc}\n\n**Stats**\n\n`)
        message.reply({ embeds: [embed], components: [row] })
    }
}