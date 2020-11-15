const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FF9A21")
  .setThumbnail(message.author.avatarURL)
  .addField("Username ", `${message.author.tag} (ID: ${message.author.id})`, true)
  .addField("Nickname ", `${message.member.displayName}`, true)
  .addField("Joined Guild At ", `${message.member.joinedAt.toDateString()}`)
  .addField("Joined Discord At ", `${message.author.createdAt.toDateString()}`)
  .setFooter('Fox-Bot | Requested by ' + message.author.tag);
if (message.mentions.users.size < 1) return message.channel.send(embed2);
  
let member = message.mentions.members.first();
let embed = new Discord.MessageEmbed()
  .setColor("#FF9A21")
  .setThumbnail(member.user.avatarURL)
  .addField("Username ", `${member.user.tag} (ID: ${member.id})`, true)
  .addField("Nickname ", `${member.nickname === null ? "None" : member.nickname}`, true)
  .addField("Joined Guild At ", `${member.joinedAt.toDateString()}`)
  .addField("Joined Discord At ", `${member.user.createdAt.toDateString()}`)
  .setFooter('Fox-Bot | Requested by ' + message.author.tag);
  message.channel.send({embed})
}
