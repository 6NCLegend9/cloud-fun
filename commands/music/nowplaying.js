const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');


module.exports = class NowPlayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nowplaying',
      aliases: 'np',
      group: 'music',
      memberName: 'nowplaying',
      aliases: ['np', 'currently-playing', 'now-playing'],
      description: 'Display the currently playing song'
    });
  }

 run(message) {
    if (
      (!message.guild.musicData.isPlaying &&
        !message.guild.musicData.nowPlaying) ||
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('There is no song playing right now!');
    }

    const video = message.guild.musicData.nowPlaying;
    let description;
    if (video.duration == 'Live Stream') {
      description = 'Live Stream';
    } else {
      description = NowPlayingCommand.playbackBar(message, video);
    }
var username = message.author.username;
var discrim = message.author.discriminator;
    const videoEmbed = new MessageEmbed()
      .setThumbnail(video.thumbnail)
      .setColor('#00da3c')
      .setTitle(video.title)
    .setURL(video.url)
     .setFooter(`Requested by ${video[0].memberDisplayName}`, video[0].memberAvatar )
      .setDescription(description);
    message.channel.send(videoEmbed);
  }
  static playbackBar(message, video) {
    const passedTimeInMS = message.guild.musicData.songDispatcher.streamTime;
    const passedTimeInMSObj = {
      seconds: Math.floor((passedTimeInMS / 1000) % 60),
      minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
      hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
    };
    const passedTimeFormatted = NowPlayingCommand.formatDuration(
      passedTimeInMSObj
    );

    const totalDurationObj = video.rawDuration;
    const totalDurationFormatted = NowPlayingCommand.formatDuration(
      totalDurationObj
    );

    let totalDurationInMS = 0;
    Object.keys(totalDurationObj).forEach(function(key) {
      if (key == 'hours') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
      } else if (key == 'minutes') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
      } else if (key == 'seconds') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
      }
    });
    const playBackBarLocation = Math.round(
      (passedTimeInMS / totalDurationInMS) * 15
    );
    let playBack = '';
      for (let i = 1; i < 25; i++) {
      if (playBackBarLocation == 0) {
        playBack = '<a:musicrillrunning:715186304819789844>▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
        break;
      } else if (playBackBarLocation == 15) {
        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬<a:musicrillrunning:715186304819789844>';
        break;
      } else if (i == playBackBarLocation * 2) {
        playBack = playBack + '<a:musicrillrunning:715186304819789844>';
      } else {
        playBack = playBack + '▬';
      }
    }
    playBack = `${passedTimeFormatted}  ${playBack}  ${totalDurationFormatted}`;
    return playBack;
  }
  // prettier-ignore
  static formatDuration(durationObj) {
      const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
      }:${
        (durationObj.seconds < 15)
          ? ('0' + durationObj.seconds)
          : (durationObj.seconds
          ? durationObj.seconds
          : '00')
      }`;
      return duration;
    }
};
