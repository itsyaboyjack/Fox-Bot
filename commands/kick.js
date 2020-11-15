module.exports.run = async (bot, message, args) => {

  if (message.member.hasPermission("KICK_MEMBERS")) {

      if (!message.mentions.users) return message.reply('You must tag 1 user.');

      else {

          const channel = message.guild.channels.cache.get(750743355985756173);
          const member = message.mentions.members.first();
          let reason = message.content.split(" ").slice(2).join(' ');

          if (member.kickable == false) return message.channel.send("That user cannot be kicked!");

          else {

              if (!reason) reason = (`No reason provided.`);

              await member.send(`You have been kicked from **${message.guild.name}** with the reason: **${reason}**`)
                  .catch(err => message.channel.send(`⚠ Unable to contact **${member}**.`));

              await member.kick(reason);

              const kickEmbed = new discord.MessageEmbed()
                  .setAuthor(member.user.tag, member.user.avatarURL())
                  .setColor("#ee0000")
                  .setTimestamp()
                  .addField("Kicked By", message.author.tag)
                  .addField("Reason", reason);

              await channel.send(kickEmbed);

              console.log(`${message.author.tag} kicked ${member.user.tag} from '${message.guild.name}' with the reason: '${reason}'.`);

          }
      }
  } else {
      message.channel.send("You do not have permission to use kick.");
      return;
  }
}