const Discord = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["limpar"],
    run: async (client, message, args) => {
        // Verifica se o autor da mensagem tem permissão para gerenciar mensagens
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("você não tem permissão para usar este comando.");
        }

        // Verifica se o número de mensagens a serem deletadas foi fornecido
        if (!args[0]) {
            return message.reply("por favor, especifique o número de mensagens a serem deletadas.");
        }

        // Converte o argumento em um número
        const amount = parseInt(args[0]);

        // Verifica se o argumento é um número válido
        if (isNaN(amount)) {
            return message.reply("por favor, especifique um número válido de mensagens.");
        }

        // Limita o número de mensagens a serem deletadas para no máximo 1000
        const maxDeleteAmount = 1000;
        const totalDeleteAmount = Math.min(amount, maxDeleteAmount);

        try {
            // Obtém as mensagens a serem deletadas
            const messages = await message.channel.messages.fetch({ limit: totalDeleteAmount + 1 });

            // Filtra as mensagens, excluindo a resposta do comando "clear"
            const filteredMessages = messages.filter(msg => msg.id !== message.id);

            // Deleta as mensagens em lotes
            await message.channel.bulkDelete(filteredMessages);

            // Envia uma mensagem informando quantas mensagens foram deletadas
            const successMessage = await message.channel.send(`Deletadas ${filteredMessages.size} mensagens.`);
            // Remove a mensagem de sucesso após 5 segundos
            successMessage.delete({ timeout: 5000 });
        } catch (error) {
            console.error(error);
            message.reply("ocorreu um erro ao deletar as mensagens.");
        }
    }
};
