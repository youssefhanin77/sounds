const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('play-dl'); 
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
const channelId = '1232865728781090916';
const guildId = '1063804912372285493'; 
const Url = 'https://www.youtube.com/watch?v=ljdq2QYG_xU&pp=ygUYZ3ltIG11c2ljIGJpdHMgcGhvbmsgNDBo'; 

client.on('ready', () => {
  console.log(`✅ | Logged in as ${client.user.tag}`);
  joinAndPlayQuran(guildId, channelId);
});

async function playQuran(channel, message) {
  const player = createAudioPlayer();
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  connection.subscribe(player);

  const stream = await play.stream(Url);
  const resource = createAudioResource(stream.stream, { inputType: stream.type });
  player.play(resource);

  player.on(AudioPlayerStatus.Playing, () => {
    message.channel.send({ embeds: [new EmbedBuilder().setDescription('**تم تشغيل القرآن**').setColor(0x00ff00)] });
  });

  player.on('error', error => console.error(`Error: ${error.message}`));
}

async function joinAndPlayQuran(guildId, channelId) {
  const channel = await client.channels.fetch(channelId);
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guildId,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const player = createAudioPlayer();

  const stream = await play.stream(Url);
  const resource = createAudioResource(stream.stream, { inputType: stream.type });

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Playing, () => console.log('Playing Quran'));
  player.on('error', error => console.error(`Error: ${error.message}`));
}

//-------------------------------------------------
    const statuses = [
        'Yeah Strangers Isss The Athletes'
    ];
    let i = 0;
    setInterval(() => {
        client.user.setActivity(statuses[i], {
            type: 'STREAMING',
            url: 'https://www.twitch.tv/athletesmena'
        });
        i = ++i % statuses.length;
    }, 1e4);
//-------------------------------------------------

client.login(process.env.TOKEN);
