const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      description: 'Loop the current playing song',
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'How many times do you want to loop the song?'
        }
      ]
    });
  }

  run(message, { numOfTimesToLoop }) {
    if (!message.guild.musicData.isPlaying) {
      return message.say('There is no song playing right now!');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('You cannot loop over a trivia!');
    }

    for (let i = 0; i < numOfTimesToLoop; i++) {
      message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    }

    // prettier-ignore
    const embed = new MessageEmbed()  
   .setColor(0x00AE86)
    	.addField('Looping', `:arrows_counterclockwise: ${message.guild.musicData.nowPlaying.title} looped ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'time' : 'times'}`)
    //.addField('Disconnected', `<:repeat:713742643489800263> ${message.guild.musicData.nowPlaying.title} looped ${numOfTimesToLoop} ${   (numOfTimesToLoop == 1) ? 'time' : 'times'}`)
    	return message.embed(embed);
	}
};