const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const subreddits = [
    "discordmemes"
]
 
module.exports = class DiscordCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord',
            group: 'random-res',
            memberName: 'discord',       
            description: 'Sends a random discord meme from selected subreddits!',
            examples: ['~dsicord'],
            details: "There is no NSFW filter on this! \n\If there is an NSFW meme, please remove it by reacting with a '🎴' emoji!",
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    run(message) {
        var randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.MessageEmbed()
                    .setFooter(`${randSubreddit}`)
                    .setDescription(`[DISCORD MEME REVIEW](${url})`)
                    .setImage(url)
                    .setColor('#00da3c');
                return message.channel.send({ embed });
            })
    }
}
