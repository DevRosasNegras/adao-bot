const fs = require("fs");

module.exports = async (client) => {
  const SlashsArray = [];

  fs.readdir("./src/Commands/Slash", (error, folders) => {
    if (error) {
      console.error("Erro ao ler diretório:", error);
      return;
    }

    folders.forEach(subfolder => {
      fs.readdir(`./src/Commands/Slash/${subfolder}/`, (error, files) => {
        if (error) {
          console.error("Erro ao ler diretório:", error);
          return;
        }

        files.forEach(file => {
          if (!file.endsWith('.js')) return;

          const command = require(`../Commands/Slash/${subfolder}/${file}`);
          if (!command.name) return;

          client.slashCommands.set(command.name, command);
          SlashsArray.push(command);
        });
      });
    });
  });

  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray));
  });
};
