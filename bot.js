const Discord = require('discord.js');
const Youtube = require('simple-youtube-api')
const Ytdl = require('ytdl-core');
const { TOKEN_DISCORD, GOOGLE_KEY } = require('./config.js');

const youtube = new Youtube(GOOGLE_KEY);
const bot = new Discord.Client();
let estouPronto = false;
const prefixCommand = 'touka?';
const filaDeMusicas = [];

const gifs= ['https://tenor.com/view/yasuo-league-leagueoflegends-of-legends-gif-5553310', 'https://tenor.com/view/yasuo-league-leagueoflegends-of-legends-gif-5553310', 
'https://tenor.com/view/league-of-legends-gif-5135342', 'https://tenor.com/view/league-of-legends-lol-lol1234-mrw-reaction-gif-14245397', 'https://tenor.com/view/league-of-legends-lol-lol1234-mrw-reaction-gif-14245397', 
'https://tenor.com/view/draven-league-of-legends-dance-crazy-dance-gif-12473794', 'https://tenor.com/view/league-of-legends-jarvan-iv-gif-18053265', 
'https://tenor.com/view/viktor-walking-league-of-legends-champion-gif-17720201', 'https://tenor.com/view/soraka-fire-lol-league-of-legends-gif-17275750', 
'https://tenor.com/view/lol-fight-yasu-league-of-legends-kids-gif-17414805', 'https://tenor.com/view/teemo-mordekaiser-league-of-legends-smack-hit-gif-17811462', 
'https://tenor.com/view/league-of-legends-zilean-shen-dance-map-awareness-gif-17792293', 'https://tenor.com/view/draven-league-of-legends-gif-5099373', 
'https://tenor.com/view/lol-adc-sup-leagueoflegends-botlane-gif-9436487', 'https://tenor.com/view/trick2g-thegatesareopen-leagueoflegends-nasus-udyr-gif-4708506', 
'https://tenor.com/view/blitzcrank-lo-l-league-league-of-legends-gif-14632741'];

const insults = ['Baka!', 'Idiot!', 'Seu Tanso.']
const commands = ['help', 'gifs', 'clean', 'join', 'play', 'pause', 'resume', 'end', 'leave']

bot.on('ready', () => {
    console.log(`${bot.user.tag} has connected.`);
});

/* 
      Explicação geral do código no contexto do que mudou nas atualizações:
      Basicamente o ideal era: quando a gente pede pro bot tocar alguma coisa,
      ele se junta e toca, e não termos dois comandos separados, um pra ele se
      juntar e um pra ele tocar coisas. Na versão que eu fiz os vídeos, ter dois
      comandos separados era tranquilo e intuitivo, apesar de ter uma usabilidade
      meio boba, em termos de código isso era de boa. Nas versões atuais, não é
      mais o caso. Assim, temos semi-gambiarras aqui pra fazer o mesmo bot do vídeo
      funcionar.
*/

bot.on('guildMemberAdd', async (member) => {
    let guild = bot.guilds.cache.get('330889917695787008');
    let channel = bot.channels.cache.get('475456809243639813');
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'ok');
    member.roles.add('331103970053455873');

    if (guild != member.guild){
        return console.log('Você não é do meu servidor!')
    }else{
        embed = new Discord.MessageEmbed()
        embed.setColor('#535787')
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL())
        embed.setTitle(`${emoji}Boas-vindas${emoji}`)
        embed.setImage('https://media.tenor.com/images/5f28e071878be764504e9e432fc9e8ed/tenor.gif')
        embed.setDescription(`${member.user}, seja bem vindo ao servidor ***${guild.name}***! Autalmente estamos com ***${member.guild.memberCount}*** membros.`)
        embed.addField('Músicas', 'Ouça músicas no canal: <#475463189379940362>')
        embed.setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        embed.setFooter('ID de usuário: ' + member.user.id)
        embed.setTimestamp();
        await channel.send(embed)
    }

});


// Agora precisamos de uma referência ao join, ela está aqui fora pra não ser
// perdida cada vez que o evento 'message' acontecer.
let connection;

// A arrow function agora precisa ser async
bot.on('message', async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') return;
    if (!msg.content.startsWith(`${prefixCommand}`));
 
    //touka?help
    else if (msg.content === `${prefixCommand}${commands[0]}`){
        let embed = new Discord.MessageEmbed()
        embed.setColor('#535787')
        embed.setAuthor(bot.user.tag, bot.user.displayAvatarURL())
        embed.setTitle(`**HELP**`)
        embed.setImage('https://media.tenor.com/images/0bd14aa4a6fac14fd693fe5ea2b64d41/tenor.gif')
        embed.setDescription(`Below you will find ${bot.user} commands.`)
        embed.addField('*touka?gifs**','This command sends random gifs.')
        embed.addField('*touka?clean*','This command clears messages. To clean them, just type: touka?clean [number of messages]')
        embed.addField('**MUSIC COMMANDS**', 'touka?join, touka?play, touka?pause, touka?resume, touka?end, touka?leave')
        embed.addField('*touka?join*', `${bot.user} will connect to the voice call (for this command you need to be connected to a voice call).`)
        embed.addField('*touka?play*',`${bot.user} will start playing music. You can either use a URL, or you can also search for ${bot.user}, example: "***touka?play twenty one pilots*** or ***touka?play Stressed Out***"`)
        embed.addField('*touka?pause*','Pause the music.')
        embed.addField('*touka?resume*','Play the music again.')
        embed.addField('*touka?end*','Stops the song, and clears the created playlist.')
        embed.addField('*touka?leave*','Exits the voice call.')
        embed.setThumbnail(bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        embed.setFooter('ID de usuário: ' + bot.user.id)
        embed.setTimestamp();
        await msg.channel.send(embed)
    }
    
    //touka?say
    else if(msg.content.startsWith(`${prefixCommand}say `)){
        let sayMessage = msg.content.replace(`${prefixCommand}say `, '')
        msg.delete().catch(O_o => {});
        msg.channel.send(sayMessage)
    }

    // touka?gifs
    else if(msg.content === `${prefixCommand}${commands[1]}`){
        var rand = gifs[Math.random() * gifs.length | 0]
        msg.channel.send(rand)
    }

    // touka?clean
    else if (msg.content.startsWith(`${prefixCommand}${commands[2]} `)) {
        if(!msg.member.hasPermission("MANAGE_MESSAGES")){
            msg.channel.send('Você não tem permissão para executar esse comando! Baka!')
        } else{
        let numberMessages = msg.content.replace(`${prefixCommand}clean `, '');
        const deleteCount = parseInt(numberMessages, 10);
            if (deleteCount < 2 !== deleteCount > 150){
            msg.channel.send('Impossível executar esse comando')
            }else {
            msg.channel.send(`${bot.user} has cleared ${deleteCount} messages.`)
            msg.channel.bulkDelete(deleteCount)
            }
        }
    }
    // !join = Bot se junta ao canal de voz
    else if (msg.content === `${prefixCommand}${commands[3]}`) {
        if (msg.member.voice.channel) { // agora é voice.channel no lugar de voiceChannel

            // Pegamos a referência que comentei acima aqui.
            connection = await msg.member.voice.channel.join();

            estouPronto = true;
        } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz! Baka!');
        }
    }

    // !leave = Bot sai do canal de voz
    else if (msg.content === `${prefixCommand}${commands[4]}`) {
        if (msg.member.voice.channel) {
            msg.member.voice.channel.leave();
            estouPronto = false;
        } else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz! Baka!');
        }
    }

    // !play [link] = Bot toca músicas
    else if (msg.content.startsWith(`${prefixCommand}${commands[5]} `)) {
        if (estouPronto) {
            let oQueTocar = msg.content.replace(`${prefixCommand}play `, '');
            try {
                let video = await youtube.getVideo(oQueTocar);
                msg.channel.send(`O video foi encontrado: ${video.title}`);
                filaDeMusicas.push(oQueTocar);
                if (filaDeMusicas.length == 1) {
                    playMusic(msg)
                }
            } catch (error) {
                try {
                    let videosPesquisados = await youtube.searchVideos(oQueTocar, 5)
                    let videoEncontrado;
                    for (i in videosPesquisados) {
                        videoEncontrado = await youtube.getVideoByID(videosPesquisados[i].id)
                        msg.channel.send(`${i}: ${videoEncontrado.title}`);
                    }
                    msg.channel.send({
                        embed: {
                            color: 535787,
                            description: 'Escolha uma música de 0 a 4!, clicando nas reações!'
                        }
                    }).then(async (embedMessage) => {
                        await embedMessage.react('0️⃣')
                        await embedMessage.react('1️⃣')
                        await embedMessage.react('2️⃣')
                        await embedMessage.react('3️⃣')
                        await embedMessage.react('4️⃣')

                        const filter = (reaction, user) => {
                            return ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name)
                                && user.id == msg.author.id;
                        }

                        let collector = embedMessage.createReactionCollector(filter, { time: 20000 });
                        collector.on('collect', async (reaction, ReactionCollector) => {
                            if (reaction.emoji.name === '0️⃣') {
                                videoEncontrado = await youtube.getVideoByID(videosPesquisados[0].id)
                                filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
                            }
                            else if (reaction.emoji.name === '1️⃣') {
                                videoEncontrado = await youtube.getVideoByID(videosPesquisados[1].id)
                                filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
                            }
                            else if (reaction.emoji.name === '2️⃣') {
                                videoEncontrado = await youtube.getVideoByID(videosPesquisados[2].id)
                                filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
                            }
                            else if (reaction.emoji.name === '3️⃣') {
                                videoEncontrado = await youtube.getVideoByID(videosPesquisados[3].id)
                                filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
                            }
                            else if (reaction.emoji.name === '4️⃣') {
                                videoEncontrado = await youtube.getVideoByID(videosPesquisados[4].id)
                                filaDeMusicas.push(`https://www.youtube.com/watch?v=${videoEncontrado.id}`);
                            }
                            if (filaDeMusicas.length == 1) {
                                playMusic(msg)
                            }
                        })
                    });
                } catch (error) {
                    msg.channel.send('Nenhum vídeo foi encontrado!')
                }
            }
        }
        else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz! Baka!');
        }
    }

    // touka?pause
    else if (msg.content === `${prefixCommand}${commands[6]}`) {
        if (msg.member.voice.channel) {
            connection = await msg.member.voice.channel.join();
            if (connection.dispatcher) {
                if (!connection.dispatcher.paused) {
                    connection.dispatcher.pause();
                } else {
                    msg.channel.send('Eu já estou pausado, bb<3.');
                }
            }
            else {
                msg.channel.send('Eu nem estou tocando nada...');
            }
        }
        else {
            msg.channel.send('Vouce precisa estar conectado a um Canal de Voz! Baka');
        }
    }
    // touka?resume
    else if (msg.content === `${prefixCommand}${commands[7]}`) {
        if (msg.member.voice.channel) {
            connection = await msg.member.voice.channel.join();
            if (connection.dispatcher) {
                if (connection.dispatcher.paused) {
                    connection.dispatcher.resume();
                } else {
                    msg.channel.send('Eu não estou pausado, bb<3.');
                }
            }
            else {
                msg.channel.send('Eu nem estou tocando nada...');
            }
        }
        else {
            msg.channel.send('Vouce precisa estar conectado a um Canal de Voz! Baka');
        }
    }
    // touka?end
    else if (msg.content === `${prefixCommand}${commands[8]}`) {
        if (msg.member.voice.channel) {
            connection = await msg.member.voice.channel.join();
            if (connection.dispatcher) {
                connection.dispatcher.end();
                while (filaDeMusicas.length > 0) {
                    filaDeMusicas.shift();
                }
            }
            else {
                msg.channel.send('Não estou tocando nada!');
            }
        }
    }
    // touka?skip
    else if (msg.content === `${prefixCommand}${commands[9]}`) {
        if (msg.member.voice.channel) {
            connection = await msg.member.voice.channel.join();
            if (connection.dispatcher) {
                if (filaDeMusicas.length > 1) {
                    connection.dispatcher.end();
                }
                else {
                    msg.channel.send('Não existem mais músicas a serem tocadas!')
                }
            }
            else {
                msg.channel.send('Não estou tocando nada!');
            }
        }
        else {
            msg.channel.send('Você precisa estar conectado a um Canal de Voz! Baka!');
        }
    }
    else{
        var randISULTS = insults[Math.random() * insults.length | 0]
        msg.channel.send('ERROR[0] - ' + randISULTS)
    }
});

function playMusic(msg) {
    connection.play(Ytdl(filaDeMusicas[0]))
        .on('finish', () => {
            filaDeMusicas.shift();
            if (filaDeMusicas.length >= 1) {
                playMusic();
            }
        });
}

bot.login(TOKEN_DISCORD);