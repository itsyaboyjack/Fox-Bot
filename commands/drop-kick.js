const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("You forgot who to drop kick dumbass.")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user}, ${message.author.username} drop kicked your ass`,{
                embed: {
                    image: {
                        url: "https://vgy.me/04YbOf.gif"
                    }
                }
            })
}