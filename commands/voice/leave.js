const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end','dc','disconnect'],
      group: 'music',
      memberName: 'leave',
      description: 'Leaves voice channel if in one'
    });
  }

 
 run(message) {
	 const connection = this.client.voice.connections.get(message.guild.id);
		if (!connection) return message.reply('I am not in a voice channel.');
		connection.channel.leave();
  var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply('Join a channel and try again');
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply('There is no song playing right now!');
      return;
    } else if (!message.guild.musicData.queue) {
      message.reply('There are no songs in queue');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      message.guild.musicData.queue.length = 0;
      return;
    } else {
      message.guild.musicData.songDispatcher.end();
      message.guild.musicData.queue.length = 0;	
     const embed = new MessageEmbed()  
   .setColor('#00da3c')
    	.addField('Disconnected', `Left **${connection.channel.name}**...`)
    	return message.embed(embed);
	}
 }
};
