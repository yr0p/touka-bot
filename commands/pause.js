const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        if (connection.dispatcher) {
            if (!connection.dispatcher.paused) {
                connection.dispatcher.pause();
            } else {
                message.channel.send("I'm already paused.");
            }
        }
        else {
            message.channel.send("I'm not even playing anything ...");
        }
    }
    else {
        message.channel.send('You need to be connected to a Voice Channel! Baka!');
    }
}