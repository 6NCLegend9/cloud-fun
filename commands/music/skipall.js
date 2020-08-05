const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Skip all songs in queue',
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }
    if (!message.guild.musicData.queue)
      return message.say('There are no songs in queue');
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0; // clear queue
      const embed = new MessageEmbed()
      .setColor('#00da3c')
     	  	.addField('Skiping all', `<:green_skip:734454978005041162> all the song skipped!`)
    	return message.embed(embed);
  }
};
