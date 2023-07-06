const Discord = require("discord.js")

module.exports = {
  name: "cargo_botao", // Coloque o nome do comando
  description: "Ganhe cargos clicando nos botões.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "cargo",
      description: "Mencione o cargo que deseja ser adicionado no botão.",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true // Define se a opção é obrigatória ou não
    },
    {
        name: "canal",
        description: "Mencione o canal onde o botão será exibido.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false // Define se a opção é obrigatória ou não
      }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
        interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
    }

        let cargo = interaction.options.getRole('cargo');

        let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`Clique no botão abaixo para resgatar o cargo ${cargo.name}`);

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('cargo_b' + interaction.id)
                .setLabel('Clique Aqui!')
                .setStyle(Discord.ButtonStyle.Secondary)
        );

        const channelOption = interaction.options.getChannel('canal');
        let channel;

        if (channelOption) {
            channel = channelOption;
        } else {
            channel = interaction.channel;
        }

        channel.send({ embeds: [embed], components: [botao] })
            .catch(console.error);

        interaction.reply({ content: `O botão do cargo \`${cargo.name}\` foi criado com sucesso.`, ephemeral: true })

        const coletor = channel.createMessageComponentCollector();

        coletor.on('collect', (c) => {
            if (c.member.roles.cache.has(cargo.id)) {
                c.member.roles.remove(cargo.id)
                    .then(() => {
                        c.reply({ content: `Olá **${c.user.username}**, você perdeu o cargo **${cargo.name}**.`, ephemeral: true })
                            .catch(console.error);
                    })
                    .catch(console.error);
            } else {
                c.member.roles.add(cargo.id)
                    .then(() => {
                        c.reply({ content: `Olá **${c.user.username}**, você resgatou o cargo **${cargo.name}**.`, ephemeral: true })
                            .catch(console.error);
                    })
                    .catch(console.error);
            }
        });

  }
}