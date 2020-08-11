require('dotenv').config();
const { XIAO_TOKEN, OWNERS, XIAO_PREFIX, INVITE } = process.env;
const path = require('path');
const { Structures } = require('discord.js');

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 0.59
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});



const Client = require('./structures/Client');
const client = new Client({
	commandPrefix: XIAO_PREFIX,
	owner: OWNERS.split(','),
	invite: INVITE,
	disableMentions: 'everyone',
	disabledEvents: ['TYPING_START']
});
const { formatNumber } = require('./util/Util');

client.registry
	.registerDefaultTypes()
	.registerTypesIn(path.join(__dirname, 'types'))
	.registerGroups([
		['util', 'Utility'],
		['info', 'Discord Information'],
    ['music', 'Music commands '],
		['random-res', 'Random Response'],
		['random-img', 'Random Image'],
		['random-seed', 'Seeded Randomizers'],
		['single', 'Single Response'],
		['auto', 'Automatic Response'],
		['search', 'Search'],
		['games', 'Games'],
		['edit-image', 'Image Manipulation'],
		['edit-avatar', 'Avatar Manipulation'],
		['edit-meme', 'Meme Generators'],
		['edit-text', 'Text Manipulation'],
		['voice', 'Voice-Based']  
	])
	.registerDefaultCommands({
	eval:false,	
  help: false,
		ping: false,
		prefix: true,
		commandState: false,
		unknownCommand: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	client.logger.info(`[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`);
	client.activities.push(
		{ text: () => `${formatNumber(client.guilds.cache.size)} servers`, type: 'WATCHING' },
		{ text: () => `with ${formatNumber(client.registry.commands.size)} commands`, type: 'PLAYING' },
		{ text: () => `${formatNumber(client.users.cache.size)} users`, type: 'WATCHING' },
		{ text: () => `${formatNumber(client.channels.cache.size)} channels`, type: 'WATCHING' }
	);
	client.setInterval(() => {
		const activity = client.activities[Math.floor(Math.random() * client.activities.length)];
		const text = typeof activity.text === 'function' ? activity.text() : activity.text;
		client.user.setActivity(text, { type: activity.type });
	}, 60000);
	if (client.memePoster.id && client.memePoster.token) {
		client.setInterval(() => client.memePoster.post(), client.memePoster.time);
	}
});

const { MessageEmbed } = require('discord.js');

client.on("guildCreate", guild => {
  var found = false;
  guild.channels.forEach(function(channel, id) {
      // If a channel is already found, nothing more needs to be done
      if(found == true || channel.type != "text") {
        return;
      }
      // If the channel isn't found and the bot has permission to 
      // send and read messages in the channel, send a welcome message there
      if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
        found = true;
        const embed = new MessageEmbed()
        .setColor('#00da3c')
        .setTitle("Thanks for inviting me to your server! Prefix: `-`")
        .setDescription("**24/7 Hosting. \nCloud fun has over 200 commands to use and have fun with it the bot will keep get updates weakly. the bot has games meme, avatar, text editor and lots of other commands use the the main prefix is - but you can customize it anything you wish for. This includes Fun, Utilities, Memes, Games and much more. with over 200+ commands this wont disappoint you at all. The features are always being updated and with these 200+ commands this will make your server pop. Amazing bot to enjoy and have fun with your friends when you're bored \n if you have issue join the main server by useing the command `info` or `invite` if you want to report of a bug or something els use the command `report` it will send into the server.**")
    return message.embed(embed);
         }
  })
});
  

/*client.on('message', async msg => {
	if (!msg.channel.topic || !msg.channel.topic.includes(':iphone: ')) return;
	if (msg.author.bot || !msg.content) return;
	const origin = client.phone.find(call => call.origin.id === msg.channel.id);
	const recipient = client.phone.find(call => call.recipient.id === msg.channel.id);
	if (!origin && !recipient) return;
	const call = origin || recipient;
	if (!call.active) return;
	try {
		await call.send(origin ? call.recipient : call.origin, msg);
	} catch {
		return; // eslint-disable-line no-useless-return
	}
});

client.on('guildMemberRemove', async member => {
	if (member.id === client.user.id) return null;
	const channel = member.guild.systemChannel;
	if (!channel || !channel.permissionsFor(client.user).has('SEND_MESSAGES')) return null;
	if (channel.topic && channel.topic.includes(':down:')) return null;
	try {
		const leaveMessage = client.leaveMessages[Math.floor(Math.random() * client.leaveMessages.length)];
		await channel.send(leaveMessage.replace(/{{user}}/gi, `**${member.user.tag}**`));
		return null;
	} catch {
		return null;
	}
}); 
*/
const DBL= require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwNzY1NDczMjQzMjQwODY0OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkxMjk5MDYzfQ.Ur43CtSo9Anmv_3hssNEwu-grD8D9MB-tTZVMK9nVJU', client);

dbl.on('posted', () => {
  console.log('Server Count Posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

client.on('disconnect', event => {
	client.logger.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('error', err => client.logger.error(err));

client.on('warn', warn => client.logger.warn(warn));

client.on('commandError', (command, err) => client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`));

client.login(XIAO_TOKEN);
