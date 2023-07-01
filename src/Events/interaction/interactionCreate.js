const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Erro ao executar ${interaction.commandName}`);
				console.error(error);
			}
		
	},
};