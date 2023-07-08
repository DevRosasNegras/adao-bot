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

        // Define o intervalo para enviar uma mensagem a cada 10 segundos
        interval = setInterval(() => {
            sendMessage(channel);
        }, 60 * 60 * 1000); // 10 segundos em milissegundos
    },
};

function sendMessage(channel) {
    // Calcula o tempo de atividade do bot
    const uptime = getBotUptime();

    // Formata o tempo de atividade no formato "Dias HH:MM:SS"
    const formattedUptime = formatUptime(uptime);

    // Cria uma embed para enviar no canal
    const embed = new Discord.EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Tempo de atividade do bot')
        .setDescription(`O bot está online há:\n\nDias         Horas\n${formattedUptime}`)
        .setTimestamp();

    try {
        channel.send({ embeds: [embed] });
    } catch (error) {
        console.error('Ocorreu um erro ao enviar a mensagem:', error);
    }
}

function getBotUptime() {
    const totalSeconds = process.uptime();
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
    const seconds = Math.floor(((totalSeconds % 86400) % 3600) % 60);
    return { days, hours, minutes, seconds };
}

function formatUptime(uptime) {
    const { days, hours, minutes, seconds } = uptime;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${days}          ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
