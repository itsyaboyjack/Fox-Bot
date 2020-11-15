const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {

    const embed = new MessageEmbed()
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(ms(bot.uptime))
    .setColor('#FF9A21')
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL)
    .setFooter('Fox-Bot | Requested by ' + message.author.tag);
    message.channel.send(embed);
}

module.exports.help = {
    name: "uptime",
    aliases: ["awake"],
}