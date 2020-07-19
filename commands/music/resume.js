const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Resume the current paused song',
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('There is no song playing right now!');
    }
//message.say('Song resumed <:circledplay:713741939433799701>');

    message.guild.musicData.songDispatcher.resume();
     const embed = new MessageEmbed()
      .setColor(0x00AE86)
    	.addField('Resume', `Song resumed :play_pause:`)
     //.addField('Resume', `Song resumed <:circledplay:713741939433799701>`)
    	return message.embed(embed);
  }
};
