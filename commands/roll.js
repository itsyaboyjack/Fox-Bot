const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
        const value = parseInt(args.join(" "));
        if (isNaN(value)) return message.channel.send("Not a valid number to roll")
        if (!isFinite(value)) return message.channel.send("Can not roll infinite")
        isFinite
        const roll = Math.floor(Math.random() * value) + 1;
        const embed = new Discord.MessageEmbed()
        .addField("The dice rolled", roll)
        .setColor("#FF9A21")
        message.channel.send({embed})
}
