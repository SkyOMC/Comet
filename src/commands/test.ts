import simplydjs from 'simply-djs';
import type { Client } from 'discord.js';

export default {
    name: 'test',
    permissions: ["SendMessages"],
    owner: true,
    aliases: [],
    enabled: true,
    async execute(client: Client<boolean>, message, args){
        simplydjs.embedCreator(message);
    }
}