const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    let region;
    switch (message.guild.region){
        case 'brazil':
            region = '🇧🇷 Brazil'
            break;
        case 'us-east':
            region = ' US-Central'
            break;
        case 'us-west':
            region = ' US-Central'
            break;
        case 'us-south':
            region = ' US-Central'
            break;
    }
    const embed = new Discord.MessageEmbed()
        .setThumbnail(message.guild.iconURL({dynamic : true}))
        .setColor('#535787')
        .setTitle(`${message.guild.name} Server Stats`)
        .addFields(
            {
                name: 'Owner: ',
                value: message.guild.owner.user.tag,
                inline: true,
            },
            {
                name: 'Members: ',
                value: `There are ${message.guild.memberCount} users!`,
                inline: true,
            },
            {
                name: 'Member Online: ',
                value: `There are ${message.guild.members.cache.filter(m => m.user.presence.status == 'online').size} users online!`,
                inline: true,
            },
            {
                name: 'Total Bots: ',
                value: `There are ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                inline: true,
            },
            {
                name: 'Creation Date: ',
                value: message.guild.createdAt.toLocaleDateString("pt-br"),
                inline: true,
            },
            {
                name: 'Role Count: ',
                value: `There are ${message.guild.roles.cache.size} roles in this server`,
                inline: true,
            },
            {
                name: '🗺 Region: ',
                value: region,
                inline: true,
            },
            {
                name: `Verified: `,
                value: message.guild.verified ? 'Server is verified' : `Server isn't verified`,
                inline: true
            },
            {
              name: 'Total Boosters: ',
              value: message.guild.premiumSubscriptionCount > 1 ? `There are ${message.guild.premiumSubscriptionCount} Boosters!` : 'There are no boosters!',
              inline: true  
            },
            {
                name: "Emojis: ",
                value: message.guild.emojis.cache.size >= 1 ? `There are ${message.guild.emojis.cache.size} emojis!` : 'There are no emojis' ,
                inline: true,
            },
        )
    await message.channel.send(embed)
}