const Discord = require('discord.js')
const fs = require("fs")
require("dotenv").config()
const delayInMilliseconds = 60000;
const config = require('./config.json');
const ytdl = require('ytdl-core');
const client = new Discord.Client()
fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
})

const { prefix, token } = require("./config.json");
const queue = new Map();
const yts = require("yt-search");


client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});



client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}leave`)) {
    stop(message, serverQueue);
    return;
  } 
});

client.on("guildMemberAdd", (member) => {
  member.send(
    `Welcome to the server! Hope you enjoy your stay and have fun 😀`
  )
})  

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  let song;
if (ytdl.validateURL(args[1])) {
  const songInfo = await ytdl.getInfo(args[1]);
  song = {
    title: info.videoDetails.title,
    url: info.videoDetails.video_url
  };
} else {
  const {videos} = await yts(args.slice(1).join(" "));
  if (!videos.length) return message.channel.send("No songs were found!");
  song = {
    title: videos[0].title,
    url: videos[0].url
  };
}

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue! :notes:`);
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);
  serverQueue.textChannel.send(`Now playing: :notes: **${song.title}**`);
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }  

  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      )
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
  }
  
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("You", {type: "WATCHING"} )

    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
    })
    //General channel id: 750743355985756173

    let generalChannel = client.channels.cache.get("750743355985756173")
    generalChannel.send("Hello there!")
})

client.on("message", async message => {
  
  if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
  
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
})

client.on("message", (message) => {
    if (message.content.startsWith("?kick")) {
      const member = message.mentions.members.first()
      if (!member) {
        return message.reply(
          `Who are you trying to kick? You must mention a user.`
        )
      }
      if (!member.kickable) {
        return message.reply(`I can't kick them, they have a higher role than me!`)
      }
      return member
        .kick()
        .then(() => message.reply(`${member.user.tag} was kicked.`))
        .catch((error) => message.reply(`Sorry, an error occured.`))
  
    }
  })
  client.on("message", (message) => {
    if (message.content.startsWith("?ban")) {
      const member = message.mentions.members.first()
      if (!member) {
        return message.reply(
          `Who are you trying to ban? You must mention a user.`
        )
      }
      if (!member.bannable) {
        return message.reply(`I can't ban them, they have a higher role than me!`)
      }
      return member
        .ban()
        .then(() => message.reply(`${member.user.tag} was banned.`))
        .catch((error) => message.reply(`Sorry, an error occured.`))
    }
  })

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if(primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } 
}


function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough arguments. Try `?multiply 2 10`")
        return
    }
    let product =1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString() )

}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `?help [topic]`")   
    } else {
        receivedMessage.channel.send("It looks like you need help with " + arguments)
    }
}


client.login(process.env.BOT_TOKEN) 