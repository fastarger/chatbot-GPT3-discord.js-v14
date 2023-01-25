require('dotenv').config();
const { EmbedBuilder } = require("discord.js")
const Discord = require(`discord.js`)
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('See my commands'),

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("See the commands below:")
        .setDescription(`</chat:1067214459883487335> Chat with the artificial intelligence through a **slash command**.\n</chatcreate:1067227264179261481> Create a channel written chatbot. You can change the channel name to something like chatbot, or chat bot, etc.`)

        interaction.reply({embeds: [embed]})
        
    }
}

// </chat:1067214459883487335> or </chatcreate:1067227264179261481> enter the id of your command
