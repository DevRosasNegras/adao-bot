const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "Anuncie algo em uma embed.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "título",
      description: "Escreva algo.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true // Define se a opção é obrigatória ou não
    },
    {
        name: "descrição",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true // Define se a opção é obrigatória ou não
      },
      {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true // Define se a opção é obrigatória ou não
      },
      {
        name: "cor",
        description: "Coloque uma cor em hexadecimal.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false // Define se a opção é obrigatória ou não
      },
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Olá ${interaction.user}, Você não tem permissão para usar este comando.`, ephemeral: true})
    } else {

        let titulo = interaction.options.getString('título');
        let desc = interaction.options.getString('descrição');
        let cor = interaction.options.getString('cor')
        if(!cor) cor = "Random"
        let chat = interaction.options.getChannel('chat');
        if(Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`);

        let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(desc)
        .setColor(cor)

        chat.send({ embeds: [embed] }).then( () => {
            interaction.reply({ content: `✔️ Seu anúncio foi enviado em ${chat} com sucesso.`, ephemeral: true })
        }).catch( (e) => {
            interaction.reply({ content: `❌ Algo deu errado.`, ephemeral: true })
        })
    }

  }
}