const  Discord = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client, interaction) {
        try{

            console.log(`🔥 O bot ${client.user.username}, está online!`);

        }catch (err) {
            console.error('Error:' + err);
        }
    }
}