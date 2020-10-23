const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You are not allowed to execute this command! Baka!');
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 1 || deleteCount > 100) 
    return message.reply('Provide a number of 2 to 100 messages to be deleted.');

    const fetched = await message.channel.messages.fetch({limit: deleteCount + 1});
    message.channel.bulkDelete(fetched)
    message.channel.send(`${client.user} has cleared ${args[0]} messages.`)
    .catch(error => console.log(`The message could not be deleted due to: ${error}`))
}