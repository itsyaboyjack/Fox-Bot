const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    let waiting = await message.channel
     .send('Pinging :hourglass:...')
     .catch(console.error);
    let embed = new Discord.MessageEmbed()
   
     .setTitle("User & API's Latency", bot.user.avatarURL)
     .setColor('#FF9A21')
     .addField(
      'User\'s ping :',
      `${waiting.createdTimestamp - message.createdTimestamp}` + 'ms`',
      true
     )
     .addField('API Latency', `${Math.round(message.client.ws.ping)}ms`)
     .setFooter('Fox-Bot | Requested by ' + message.author.tag);
   
    waiting.edit(embed).catch(console.error);
   };
   
   module.exports.help = {
    name: 'ping',
    description: "Calculate User & API's Latency.",
    usage: 'ping',
    example: 'ping',
   };