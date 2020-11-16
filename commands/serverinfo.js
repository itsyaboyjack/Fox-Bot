const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   const role = message.guild.roles.size;
   const online = message.guild.members.cache.filter(m => m.presence.status != 'offline').size
   const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
      const embed = new Discord.MessageEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL)
     .setColor("#FF9A21")
      .addField('Member Count', `${message.guild.memberCount}`, true)
      .addField('Server Region', message.guild.region)
      .addField('Created At', message.guild.createdAt.toLocaleString(), true)
      .setFooter('Fox-Bot | Requested by ' + message.author.tag);
      message.channel.send({embed}) 
}