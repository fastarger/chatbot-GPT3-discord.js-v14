const {SlashCommandBuilder} = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Conversar com chat GPT3 API')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('Fale algo')
        .setRequired(true)),

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const prompt = interaction.options.getString('input');
      interaction
      .followUp({
        content: `Deixe me pensar...`,
        ephemeral: true,
      })

    const configuration = new Configuration({
      apiKey: "SUA_API_KEY_OPENAI",
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    let responseMessage = '> ' + prompt + response.data.choices[0].text;

    /* Se a mensagem tiver mais de 2000 caractere ela responde um arquivo de texto */
    if (responseMessage.length >= 2000) {
      const attachment = new AttachmentBuilder(Buffer.from(responseMessage, 'utf-8'), { name: 'response.txt' });
      await interaction.editReply({ files: [attachment] })
    } else {
      await interaction.editReply(responseMessage);    
    }
  },
};

