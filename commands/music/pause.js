const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold', 'stop'],
      memberName: 'pause',
      group: 'music',
      description: 'Pause the current playing song',
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.say('There is no song playing right now!');
    }

   // message.say('Song paused <:pause:713742415080718337>');

    message.guild.musicData.songDispatcher.pause();
      const embed = new MessageEmbed()
      .setColor('#00da3c')
    	.addField('Pause', `Song paused <:green_pause:734414311262388234> `)
      //.addField('Pause', `Song paused <:pause:713742415080718337>`)
    	return message.embed(embed);
  }
};
