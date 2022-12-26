const {SlashCommandBuilder} = require("@discordjs/builders");
const { Discord, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Veja meu PING!'),

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, interaction, message) => {
    let ping = client.ws.ping;

    let embed_1 = new EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("Random");

    let embed_2 = new EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor("Random");

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}