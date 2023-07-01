const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("ping") // Coloque o nome do comando
        .setDescription("Veja o ping do bot."), // Coloque a descrição do comando

    async(interaction) {

        let ping = client.ws.ping;

        let embed_1 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
            .setColor("DarkPurple");

        let embed_2 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
            .setColor("Purple");

        interaction.reply({ embeds: [embed_1] }).then(() => {
            setTimeout(() => {
                interaction.editReply({ embeds: [embed_2] })
            }, 2000)
        })
    }
}