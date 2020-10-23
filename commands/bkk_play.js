const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch')
const youtube_key = 'AIzaSyDPNVPACLc49B_4h61fNDsVbBpf2bIfj_4'

const playThisMusic = []

module.exports.run = async (client, message, args) => {
    message.channel.bulkDelete(1);
    if (!args[0]) {
        let s = await message.channel.send('Please add keyword to search for video.').cath(err => console.error(err));
        setTimeout(() => { s.delete() }, 5000);
        return;
    }

    let validate = ytdl.validateURL(args[0]);
    let search = args;
    let youtube_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${search}&type=video&key=${youtube_key}`

    const response = await fetch(youtube_url);
    const dataAPI = await response.json();
    const video = dataAPI.items[0];
    const video_url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    const snippet = video.snippet;

    console.log(video_url)
    if (!validate) {
        playSong(video_url);
    }
    else if (validate) {
        playSong(args[0]);
    }

    async function playSong(video) {
        try {
            if (!message.guild) return;
            const connection = await message.member.voice.channel.join();
            if (message.member.voice.channel) {
                connection.play(ytdl(`${video}`, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1024 * 1024 * 10 }));
                ytdl.getInfo(video_url, function (err, info) {
                    let streamEmbed = new Discord.MessageEmbed()
                        .setTitle('Now Streaming')
                        .setColor('#535787')
                        .setThumbnail(snippet.thumbnails.default.url)
                        .setDescription(info.title)
                        .setTimestamp()
                        .setFooter(`Sent by ${message.author.username}`, message.author.displayAvatarURL());
                    message.channel.send(streamEmbed);
                });
            } else {
            let s = await message.channel.send('You need to join a voice channel first!')
            setTimeout(() => {s.delete()}, 5000);
            }
        } catch{
            let s = await message.channel.send('You need to join a voice channel first!')
            setTimeout(() => {s.delete()}, 5000)
        }
    }
}