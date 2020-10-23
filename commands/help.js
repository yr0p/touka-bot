const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let embed = new Discord.MessageEmbed();
    embed.setColor('#535787');
    embed.setAuthor(client.user.tag, client.user.displayAvatarURL());
    embed.setTitle(`**HELP**`);
    embed.setImage('https://media.tenor.com/images/0bd14aa4a6fac14fd693fe5ea2b64d41/tenor.gif');
    embed.setDescription(`Below you will find ${client.user} commands.`);
    embed.addField('***touka?server-info***','This command shows the status of the server.');
    embed.addField('***touka?gifs***','This command sends random gifs.');
    embed.addField('***touka?clean [number of messages]***','This command clears messages. To clean them, just type: touka?clean [number of messages]');
    embed.addField('**MUSIC COMMANDS**', 'touka?join, touka?play, touka?pause, touka?resume, touka?end, touka?leave');
    embed.addField('***touka?play [URL] or [NAME_MUSIC]***',`${client.user} will start playing music. You can either use a URL, or you can also search for ${client.user}, 
    example: "***touka?play twenty one pilots*** or ***touka?play Stressed Out***"`);
    embed.addFields(
        {
            name: '***touka?skip***', 
            value: 'Skip the music.',
            inline: true,
        },
        {
            name: '***touka?pause***',
            value: 'Pause the music.',
            inline: true,
        },
        {
            name: '***touka?resume***',
            value: 'Play the music again.',
            inline: true,
        },
        {
            name: '***touka?stop***',
            value: 'Stops the song, and clears the created playlist.',
            inline: true,
        },
        {
            name: '***touka?leave***',
            value: 'Exits the voice call.',
            inline: true,
        }
    )
    embed.setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}));
    embed.setFooter('ID de usuário: ' + client.user.id);
    embed.setTimestamp();
    await message.channel.send(embed);
}