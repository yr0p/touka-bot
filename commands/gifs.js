const Discord = require('discord.js');
const gifs= ['https://tenor.com/view/yasuo-league-leagueoflegends-of-legends-gif-5553310', 'https://tenor.com/view/yasuo-league-leagueoflegends-of-legends-gif-5553310', 
'https://tenor.com/view/league-of-legends-gif-5135342', 'https://tenor.com/view/league-of-legends-lol-lol1234-mrw-reaction-gif-14245397', 'https://tenor.com/view/league-of-legends-lol-lol1234-mrw-reaction-gif-14245397', 
'https://tenor.com/view/draven-league-of-legends-dance-crazy-dance-gif-12473794', 'https://tenor.com/view/league-of-legends-jarvan-iv-gif-18053265', 
'https://tenor.com/view/viktor-walking-league-of-legends-champion-gif-17720201', 'https://tenor.com/view/soraka-fire-lol-league-of-legends-gif-17275750', 
'https://tenor.com/view/lol-fight-yasu-league-of-legends-kids-gif-17414805', 'https://tenor.com/view/teemo-mordekaiser-league-of-legends-smack-hit-gif-17811462', 
'https://tenor.com/view/league-of-legends-zilean-shen-dance-map-awareness-gif-17792293', 'https://tenor.com/view/draven-league-of-legends-gif-5099373', 
'https://tenor.com/view/lol-adc-sup-leagueoflegends-botlane-gif-9436487', 'https://tenor.com/view/trick2g-thegatesareopen-leagueoflegends-nasus-udyr-gif-4708506', 
'https://tenor.com/view/blitzcrank-lo-l-league-league-of-legends-gif-14632741'];

module.exports.run = async (client, message, args) => {
    var rand = gifs[Math.random() * gifs.length | 0];
    message.channel.send(rand);
}