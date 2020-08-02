const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const malware = require('malapi').Anime;

module.exports = class animeCommand extends Command {
	constructor (client) {
		super(client, {
			'name': 'anime',
			'group': 'other',
			'aliases': ['ani', 'mal'],
			'memberName': 'anime',
			'description': 'Find anime on MyAnimeList',
			'examples': ['anime {animeName}', 'anime Yu-Gi-Oh'],
			'guildOnly': false,

			'args': [
				{
					'key': 'query',
					'prompt': 'What anime do you want to find?',
					'type': 'string',
					'label': 'Anime to look up'
				}
			]
		});
	}

	run (msg, args) {
		malware.fromName(args.query).then((anime) => {
			const animeEmbed = new Discord.MessageEmbed(); // eslint-disable-line one-var

			animeEmbed
				.setAuthor(args.query, 'https://myanimelist.cdn-dena.com/img/sp/icon/apple-touch-icon-256.png')
				.setColor('#BA55D3')
				.setImage(anime.image)
				.setURL(`https://myanimelist.net/anime/${anime.id}`);

			if (anime.alternativeTitles.japanese) {
				animeEmbed.addField('Japanese name', anime.alternativeTitles.japanese, true);
			} else {
				animeEmbed.addField('Japanese name', 'None', true);
			}

			if (anime.alternativeTitles.english) {
				animeEmbed.addField('English name', anime.alternativeTitles.english, true);
			} else {
				animeEmbed
					.addField('English name', 'None', true)
					.addBlankField(true);
			}


			if (anime.synopsis.length >= 1024) {
				animeEmbed.addField('Synposis',
					`The synopsis for this anime exceeds the maximum length, check the full synopsis on myanimelist.\nSynopsis Snippet:\n${anime.synopsis.slice(0, 500)}`);
			} else {
				animeEmbed.addField('Synposis', anime.synopsis, false);
			}

			anime.statistics.score.value !== '' ? animeEmbed.addField('Score', anime.statistics.score.value, true) : animeEmbed.addField('Score', 'Score unknown', true);
			animeEmbed
				.addField('Episodes', anime.episodes, true)
				.addField('Status', anime.status, true)
				.addField('URL', `https://myanimelist.net/anime/${anime.id}`, true);

			return msg.embed(animeEmbed);
		})
			.catch((err) => {
				console.error(err); // eslint-disable-line no-console

				return msg.reply('⚠ No results found. An error was logged to your error console');
			});

	}
};
