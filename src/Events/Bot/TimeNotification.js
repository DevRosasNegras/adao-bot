const Discord = require('discord.js');
const config = require('../../../config.json');

let interval; // Variável para armazenar o intervalo

module.exports = {
    name: 'ready', // Nome do evento
    async execute(client) {
        // Verifica se o canal existe e é acessível pelo bot
        const channel = client.channels.cache.get(config.channelID);
        if (!channel) return console.log('Canal não encontrado.');

        // Envia a primeira mensagem imediatamente
        sendMessage(channel);

        // Define o intervalo para enviar uma mensagem a cada uma hora
        interval = setInterval(() => {
            sendMessage(channel);
        }, 60 * 60 * 1000); // 1 hora em milissegundos
    },
};

function sendMessage(channel) {
    // Calcula o número de horas desde o último reinício do bot
    const uptime = getBotUptime();

    // Cria uma embed para enviar no canal
    const embed = new Discord.EmbedBuilder()
        .setColor('Purple')
        .setTitle('Tempo de atividade do bot')
        .setDescription(`O bot está ligado há ${uptime} horas.`)
        .setTimestamp();

    try {
        channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Ocorreu um erro ao enviar a mensagem:', error);
    }
}

function getBotUptime() {
    const totalSeconds = process.uptime();
    const hours = Math.floor(totalSeconds / 3600);
    return hours;
}
