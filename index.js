const discord = require('discord.js');
const client = new discord.Client();
const prefix = 'touka?';

client.commands = new discord.Collection();
client.queue = new Map();

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.user.setActivity('touka?help | created by yr0p');
});

client.on('guildMemberAdd', async (member) => {
    let guild = client.guilds.cache.get('330889917695787008');
    let channel = client.channels.cache.get('763945778275287073');
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'ok');
    member.roles.add('331103970053455873');

    if (guild != member.guild){
        return console.log('You are not from my server!')
    }else{
        embed = new discord.MessageEmbed()
        embed.setColor('#535787')
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL())
        embed.setTitle(`⚠Welcome⚠`)
        embed.setImage('https://media.tenor.com/images/5f28e071878be764504e9e432fc9e8ed/tenor.gif')
        embed.setDescription(`${member.user}, seja bem vindo ao servidor ***${guild.name}***! Autalmente estamos com ***${member.guild.memberCount}*** membros.`)
        embed.addField('Music', 'Listen to music on the channel: <#475463189379940362>')
        embed.setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        embed.setFooter('ID de usuário: ' + member.user.id)
        embed.setTimestamp();
        await channel.send(embed)
    }
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;

    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    try{
        let commandFile = require(`./commands/${command}.js`);
        delete require.cache[require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (e){
        return message.reply("Error: I still don't know this command!");
    }
});

client.login('NzQ3NTg5OTU0NDIyNTcxMDQ5.X0RFZg.aDMTsIssR8i45XgqmWnY85BK33g');