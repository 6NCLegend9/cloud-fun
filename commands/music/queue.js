
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
       aliases: ['song-list', 'q'],
      group: 'music',
      memberName: 'queue',
      description: 'Display the song queue'
    });
  }

  run(message) {
    if (message.guild.triviaData.isTriviaRunning)
      return message.say('Try again after the trivia has ended');
    if (message.guild.musicData.queue.length == 0)
      return message.say('There are no songs in queue!');
    const titleArray = [];
    /* eslint-disable */
    // display only first 10 items in queue
    message.guild.musicData.queue.slice(0, 15).forEach(obj => {
      titleArray.push(obj.title);
    });
    /* eslint-enable */
    var queueEmbed = new MessageEmbed()
      .setColor('#00da3c')
      .setTitle('<:green_queue:734420971120885771>Music Queue')
    //.setTitle('<:CloudMusic:711677713374642287>Music Queue')
    .setFooter('display only first 15 songs and limited to 100 songs')
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
    }
    return message.say(queueEmbed);
  }
};
