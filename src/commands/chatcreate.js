require('dotenv').config();
const {SlashCommandBuilder} = require("@discordjs/builders");
const Discord = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chatcreate')
    .setDescription('Create an chat for chatbot non using slash command'),

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (Client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })}
        else
        {
            let nome = interaction.options.getString("nome")
            const nomecanal = `chatbot` // nome que deseja no canal criado

            interaction.guild.channels.create({
                name: nomecanal,
                type: Discord.ChannelType.GuildText,
            })
            interaction.reply({ content: `Canal de texto criado (${nomecanal})!`, ephemeral: true })
        }
    }
}
