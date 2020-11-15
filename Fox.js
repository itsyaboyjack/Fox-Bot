const Discord = require('discord.js')
const randomPuppy = require('random-puppy');
const fs = require("fs")
require("dotenv").config()
const { prefix, token } = require('./config.json');
const Enmap = require("enmap");
const ytdl = require('ytdl-core');
const client = new Discord.Client()
const config = require('./config.json');
const queue = new Map();
const yts = require("yt-search");
client.config = config;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.commands = new Enmap();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

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

client.login(process.env.BOT_TOKEN);