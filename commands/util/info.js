const Command = require('../../structures/Command');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const { version: commandoVersion } = require('discord.js-commando');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber, embedURL } = require('../../util/Util');
const { version, dependencies } = require('../../package');
const permissions = require('../../assets/json/permissions');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['stats', 'uptime'],
			group: 'util',
			memberName: 'info',
			description: 'Responds with detailed bot information.',
			guarded: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}  

	async run(msg) {
		const invite = await this.client.generateInvite(permissions);
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
			.addField("Server's", formatNumber(this.client.guilds.cache.size), true)
			.addField("Command's", formatNumber(this.client.registry.commands.size), true)
			.addField("Shard's", formatNumber(this.client.options.shardCount), true)
      .addField('<a:Discord:689042469819908116> Home Server',	this.client.options.invite ? embedURL('Invite', invite) : 'None', true)
      .addField('<:Twitter:733812544426475570> Twitter', embedURL('Twitter', 'https://twitter.com/OfficialZeroNat?s=09'), true)
      .addField('<:Instagram:733812231795638352> Instagram', embedURL('Instagram', 'https://www.instagram.com/official_zero_nation/'), true)
    	.addField('Invite', embedURL('Add Me', 'https://discord.com/api/oauth2/authorize?client_id=707654732432408648&permissions=775290177&scope=bo'), true)
      .addField('Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField('Uptime', moment.duration(this.client.uptime).format('d:hh:mm:ss'), true)
			.addField('Version', `v${version}`, true)
			.addField('Node.js', process.version, true)
			.addField('Discord.js', `v${djsVersion}`, true)
			.addField('Commando', `v${commandoVersion}`, true)
    	.addField("Developer's", `NC_Legend#2147, Bass Station#2498, Reverse#0001, chrhol#5015`, true)
     .setFooter('All the rights are belongs to Cloud Support©™️')
    .setTimestamp()
		return msg.embed(embed);
	}
};
