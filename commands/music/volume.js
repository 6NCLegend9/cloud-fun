const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Adjust song volume',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt: 'What volume would you like to set? from 1 to 250 (the deafult volume is 100)',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 250
        }
      ]
    });
  }
  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
     const embed = new MessageEmbed()
      .setColor(0x00AE86)
    	.addField('Volume', `Current volume is: ${wantedVolume}% `)
     	//.addField('Volume', `Current volume is: ${wantedVolume}% <:audio:713742239196512358>`)
    	return message.embed(embed);
  }
};