import type { Client, Message } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

export default {
    name: "ping",
    aliases: ["p"],
    owner: false,
    enabled: true, // TODO: add enabled flag
    permissions: [],
    execute: (client: Client<boolean>, message: Message<boolean>, _args: string[]) => {
        message.reply({ embeds: [new EmbedBuilder()
            .setTitle('Ping')
            .setDescription(`\`\`\`${client.ws.ping}ms\`\`\``)
            .setColor('Blue')
    ]
    })
    }
}