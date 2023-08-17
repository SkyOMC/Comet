type names = "sky" | "tacodark";
import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } from 'discord.js';
import type { BaseInteraction, Client, InteractionCollector, Message } from 'discord.js';

type credits = {
    name: string;
    Contributions: string[];
    description: string;
}; 
const credits: credits[] = [
    {
        name: "Sky",
        Contributions: ["Developer"],
        description: ""
    },
    {
        name: "TacoDark",
        Contributions: ["Staff", "Support"],
        description: "Hello There Human (Hopefully not a bot), I am TacoDark, Support at Comet! I like to make music and play games, Subscribe to my youtube! \nYoutube: TacoDark\nDiscord: tacodark"
    }
]
const lines_embed_ovr: string[] = [
    "> **__Welcome to the about section!__**",
    "- You can choose a user below using the select menu!",
    "- To get help about the bot Join the support server by clicking the title!",
    "- Thanks for choosing comet :comet:"
];


export default {
    name: "about",
    aliases: ["credits"],
    enabled: true,
    async execute(client: Client<true>, message: Message<true>, args: string[]){
        const embed: EmbedBuilder = (new EmbedBuilder()
        .setAuthor({ name: "Comet", iconURL: client.user.displayAvatarURL() })
        .setDescription(`${lines_embed_ovr.join("\n")}`)
        .setColor("Blue")
        .setThumbnail(client.user.displayAvatarURL() as string)) as EmbedBuilder;
        const row: ActionRowBuilder<StringSelectMenuBuilder> = (new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("about_row")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel("Sky")
                .setEmoji("☁️")
                .setValue("sky"),
                new StringSelectMenuOptionBuilder()
                .setLabel("TacoDark")
                .setEmoji("💻")
                .setValue("tacodark")
            )
        )) as ActionRowBuilder<StringSelectMenuBuilder>;
        const filter = (i: BaseInteraction<any>) => i.user.id === message.author.id;
        const msg: Message<true> = await message.channel.send({ embeds: [embed], components: [row] });
        const collector: InteractionCollector<any> = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 180e2, filter });

        collector.on("collect", e => {
            const val: names = e.values[0];
            
            const embed_user = setupAbout(val, client); 
            msg.edit({ embeds: [embed_user] })
            e.deferUpdate()
            
        })
    }
}

function setupAbout(val: names, client: Client<true>): EmbedBuilder{
    let embed_user: EmbedBuilder = (new EmbedBuilder()) as EmbedBuilder;
    
    switch(val){
        case "tacodark": {
            const lines: string[] = [
                "> **__Description__**",
                "Hello There Human (Hopefully not a bot), I am TacoDark, Support at Comet! I like to make music and play games, Subscribe to my youtube!",
                "Youtube: TacoDark",
                "Discord: tacodark",
                "> **__Contributions__**",
                "- Staff & Support"
            ]
            embed_user.setAuthor({ name: "Comet", iconURL: client.user.displayAvatarURL() }).setColor("Blue")
            .setTitle("TacoDark's About me!")
            .setDescription(`${lines.join("\n")}`)
        } break;
        case "sky": {
            const lines: string[] = [
                "> **__Description__**",
                "Hello there! i'm Sky, a developer and gamer, you can talk to me using [discord](https://discord.gg/9nKb4vmwxy)",
                "> **__Contributions__**",
                "- Developer"
            ]
            embed_user.setAuthor({ name: "Comet", iconURL: client.user.displayAvatarURL() }).setColor("Blue")
            .setTitle("Sky's About me!")
            .setDescription(`${lines.join("\n")}`)
        }
    }
    return embed_user;
}