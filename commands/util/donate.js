const Command = require('../../structures/Command');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber, embedURL } = require('../../util/Util');
const permissions = require('../../assets/json/permissions');

module.exports = class DonateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'donate',
			aliases: ['paypal'],
			group: 'util',
			memberName: 'donate',
			description: 'Responds with the bot\'s donation links.',
			guarded: true,
			credit: [
				{
					name: 'PayPal',
					url: 'https://www.paypal.com/us/home',
					reason: 'Donation Gathering'
				}
			]
		});
	}

	run(msg) {

		const embed = new MessageEmbed()
			.setColor('#00da3c')
		.setTitle('donation')	
    .addField('Contribute to development!',	this.client.options.invite ? embedURL('donate', 'https://www.paypal.me/saradalmeida') : 'None', true)
		return msg.embed(embed);
	}
};
