const Discord = require("discord.js")

module.exports = {
    name: "ping", // Coloque o nome do seu comando
    aliases: [""], // Coloque sinônimos do nome do comando

    run: async(client, message, args) => {

        let embed = new Discord.EmbedBuilder()
        .setColor("Purple")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`🏓 Olá ${message.author}, o ping do bot está em: \`carregando...\`.`);

        let embed2 = new Discord.EmbedBuilder()
        .setColor("DarkPurple")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`🏓 Olá ${message.author}, o ping do bot está em: \`${client.ws.ping}ms\`.`);

        message.reply({ embeds: [embed] }).then(msg => {
            setTimeout( () => {
                msg.edit({ embeds: [embed2] })
            }, 3000)
        })
    }
}