const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
        data: new SlashCommandBuilder()
                .setName('imagine')
                .setDescription('Generate images using midjourney')
                .addStringOption(option =>
                        option
                                .setName('prompt')
                                .setDescription('Specify the image to be generated...')
                                .setRequired(true)
                ),
                run: async (client, interaction, args) => {

                const { default: midjourney } = await import('midjourney-client')
                const prompt = interaction.options.getString('prompt')

                midjourney(prompt).then(response => {
                        if (response.length < 1) {
                                interaction.editReply('Something went wrong, try again!')
                        }

                        const imageURLs = response.join('\n')

                        let invite = new ActionRowBuilder().addComponents([
                            new ButtonBuilder()
                            .setLabel('🔗 Invite')
                            .setURL("https://discord.com/oauth2/authorize?client_id=1056762541084254278&scope=bot&permissions=29427282233618192")
                            .setStyle(5),
                          ]);
              
                          const embed = new EmbedBuilder()
                          .setImage(`${imageURLs}`)
                          .setDescription(`<:midjourney:1077411973223944213> Here is your generated image for **"${prompt}"**:`)
                          .setColor('#0099ff');
                    
                        interaction.editReply({embeds: [embed], components: [invite]})
                      .catch(error => console.error(error));

                })

                await interaction.reply(`<a:loading:1074141548012388432> Generating your image for the theme **${prompt}**..`)
        }
}
