const Discord = require("discord.js");
const client = new Discord.Client({ intents: [32767] });
const config = require("./config.json");
const fs = require("fs");
const path = require('node:path');
const glob = require('glob');

const DataBase = require('./src/Config/dataBase');
const db = new DataBase;

db.connect();

client.login(config.token)

// carregador e Gerenciador de eventos.
const eventsPath = path.join(__dirname, './src/Events');
const eventFiles = glob.sync('**/*.js', { cwd: eventsPath });

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Carregar e gerencia os comandos de prefix do bot
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./src/Commands/Prefix/`);

fs.readdirSync('./src/Commands/Prefix/').forEach(local => {
    const comandos = fs.readdirSync(`./src/Commands/Prefix/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for (let file of comandos) {
        let puxar = require(`./src/Commands/Prefix/${local}/${file}`)

        if (puxar.name) {
            client.commands.set(puxar.name, puxar)
        }
        if (puxar.aliases && Array.isArray(puxar.aliases))
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    }
});

client.on("messageCreate", async (message) => {

    let prefix = config.prefix;

    if (message.author.bot) return;
    if (message.channel.type === Discord.ChannelType.DM) return;

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd)) 
        try {
            command.run(client, message, args)
        } catch (err) {
            console.error('Erro:' + err);
        }
    
        const resposta = "sim"; // Resposta do usuário (sim ou não)

        if (resposta.toLowerCase() === "sim") {
            message.delete().catch(console.error);
        }
});

// gerenciador de interações
module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.slashCommands = new Discord.Collection()
require('./src/handler')(client)