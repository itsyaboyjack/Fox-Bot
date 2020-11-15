const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!args[2]) return message.reply("Please ask a full question!")
    let replies = ["Yes.", "No.", "Yeah right my ass", "It seems so", "Don't let this distract you from the fact that Outpacing is gay", "I'm too tired, ask again later :yawning_face:"];

    let result =Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed =new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9A21")
    .addField("Question", question)
    .addField("Answer", replies[result])
    .setFooter('Fox-Bot | Requested by ' + message.author.tag);

    message.channel.send(ballembed);
}