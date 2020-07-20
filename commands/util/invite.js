const Command = require('../../structures/Command');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber, embedURL } = require('../../util/Util');
const permissions = require('../../assets/json/permissions');


module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'util',
			memberName: 'invite',
			description: 'Responds with the bot\'s invite links.',
			guarded: true
		});
	}

	async run(msg) {
    
	const invite = await this.client.generateInvite(permissions);
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
		.setTitle('Invitation!')	
    .addField('Join my home server for support and announcements',	this.client.options.invite ? embedURL('Invite', 'https://discord.gg/sy6Jrze') : 'None', true)
			.addField('Invite me using this link', embedURL('Add Me', 'https://discord.com/api/oauth2/authorize?client_id=707654732432408648&permissions=775290177&scope=bot'), true)
		return msg.embed(embed);
	}
};
