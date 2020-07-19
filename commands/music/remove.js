const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
        aliases: [ 'delete', 'r'],
      group: 'music',
      description: 'Remove a specific song from queue',
      args: [
        {
          key: 'songNumber',
          prompt: 'What song number do you want to remove from queue?',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Please enter a valid song number');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
   // return message.say(`<:trashcan:713747946608525383> Removed song number ${songNumber} from queue`);
    const embed = new MessageEmbed()
      .setColor(0x00AE86)
    	.addField('Removed', `Removed song number ${songNumber} from queue`)
   // .addField('Removed', `<:trashcan:713747946608525383> Removed song number ${songNumber} from queue`)
    	return message.embed(embed);
  }
};
