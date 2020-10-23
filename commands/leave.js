const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.member.voice.channel) {
        message.member.voice.channel.leave();
    } else {
        message.channel.send('You need to be connected to a Voice Channel! Baka!');
    }
}