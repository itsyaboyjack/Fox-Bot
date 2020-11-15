const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = (message.guild.members.cache.filter(m => m.presence.status != 'offline').size - message.guild.members.cache.filter(m=>m.user.bot).size)
      const embed = new Discord.MessageEmbed()
            .setAuthor("Server: " + message.guild.name, message.guild.iconURL)
            .setColor("#FF9A21")
            .addField('Members', `${message.guild.memberCount - message.guild.members.cache.filter(m=>m.user.bot).size}`, true)
            .addField("Bots", message.guild.members.cache.filter(m=>m.user.bot).size)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send({embed}) 
}