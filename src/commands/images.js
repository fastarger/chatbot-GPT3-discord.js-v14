require('dotenv').config();
const {SlashCommandBuilder} = require("@discordjs/builders");
const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generate-image')
    .setDescription('generates an image')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('generates an image')
        .setRequired(true)),

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const prompt = interaction.options.getString('prompt');
    interaction.reply({
        content: `<a:loading_empire_island:895500477201006592> Let me think...`,
        ephemeral: false,
      })

      async function generateImage(prompt) {
        const API_KEY = process.env.OPEN_AI_KEY;
        const API_URL = `https://api.openai.com/v1/images/generations`;
        
      
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: 'image-alpha-001',
            prompt: prompt,
          })
        });
      
        const json = await response.json();
        return json.data[0].url;
      }      

      let invite = new ActionRowBuilder().addComponents([
              new ButtonBuilder()
              .setLabel('🔗 Invite')
              .setURL("https://discord.com/oauth2/authorize?client_id=1056762541084254278&scope=bot&permissions=29427282233618192")
              .setStyle(5),
            ]);

      generateImage(`${prompt}`)
      .then(url => {
        const embed = new EmbedBuilder()
          .setImage(url)
          .setDescription(`Here is your generated image for **"${prompt}"**:`)
          .setColor('#0099ff');
    
        interaction.editReply({embeds: [embed], components: [invite], content: '<:requisitos:994730420606341240>'})
      })
      .catch(error => console.error(error));
  },
};
