const Command = require('../../structures/Command');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber, embedURL } = require('../../util/Util');
const permissions = require('../../assets/json/permissions');


module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'vote',
			group: 'util',
			memberName: 'vote',
			description: 'Responds with the bot\'s vote links.',
			guarded: true
		});
	}

	async run(msg) {
    
	const invite = await this.client.generateInvite(permissions);
		const embed = new MessageEmbed()
			.setColor(0x00AE86)
		.setTitle('Vote!')	
			.addField('Vote', embedURL('Vote for me here', 'https://top.gg/bot/707654732432408648/vote'), true)
		return msg.embed(embed);
	}
};
