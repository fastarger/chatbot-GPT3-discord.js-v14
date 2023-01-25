require('dotenv').config();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const Discord = require(`discord.js`)
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('See my commands'),

    run: async (client, interaction) => {

    const invite = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setLabel('🔗 Invite')
        .setURL("https://discord.com/oauth2/authorize?client_id=1056762541084254278&scope=bot&permissions=29427282233618192")
        .setStyle(5),
        );

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("See the commands below:")
        .setDescription(`</chat:1067214459883487335> Chat with the artificial intelligence through a **slash command**.\n</chatcreate:1067227264179261481> Create a channel written chatbot. You can change the channel name to something like chatbot, or chat bot, etc.`)

        interaction.reply({embeds: [embed], components: [invite]})
    }
}
