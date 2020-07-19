const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 's'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`You can't skip a trivia! tyep *.endtrivia*`);
    }
    message.guild.musicData.songDispatcher.end();
    const embed = new MessageEmbed()
      .setColor('#404040')
     	  	.addField('Skip', `<:green_skip:734454978005041162> Skipped!`)
   // .addField('Removed', `<:trashcan:713747946608525383> Removed song number ${songNumber} from queue`)
    	return message.embed(embed);
  }
};  
