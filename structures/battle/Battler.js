const { stripIndents } = require('common-tags');
const { list } = require('../../util/Util');
const choices = ['attack', 'defend', 'special', 'cure', 'final', 'run'];

module.exports = class Battler {
	constructor(battle, user) {
		this.battle = battle;
		this.user = user;
		this.bot = user.bot;
		this.hp = 400;
		this.mp = 200;
		this.guard = false;
		this.usedFinal = false;
	}

	async chooseAction(msg) {
		if (this.bot) {
			if (this.canFinal) return 'final';
			const botChoices = ['attack', 'attack', 'defend'];
			if (this.canSpecial) botChoices.push('special');
			if (this.canHeal && this.hp < 150) botChoices.push('cure');
			return botChoices[Math.floor(Math.random() * botChoices.length)];
		}
		let content = stripIndents`
			${this}, do you ${list(choices.map(choice => `**${choice}**`), 'or')}? You have **${this.mp}** MP.
			**${this.battle.user.user.tag}:** ${this.battle.user.hp} HP
			**${this.battle.opponent.user.tag}:** ${this.battle.opponent.hp} HP
		`;
		if (this.battle.turn === 1 || this.battle.turn === 2) {
			content += '\n\n_Cure takes all of you`re MP._';
		}
		await msg.say(content);
		const filter = res => {
			const choice = res.content.toLowerCase();
			if (res.author.id === this.user.id && choices.includes(choice)) {
				if ((choice === 'special' && !this.canSpecial) || (choice === 'cure' && !this.canHeal)) {
					msg.say('You don\'t have enough MP for that!').catch(() => null);
					return false;
				}
				if (choice === 'final' && !this.canFinal) {
					msg.say('You must have under 100 HP and over 50 MP. Final can only be used once!').catch(() => null);
					return false;
				}
				return true;
			}
			return false;
		};
		const turn = await msg.channel.awaitMessages(filter, {
			max: 1,
			time: 30000
		});
		if (!turn.size) return 'failed:time';
		return turn.first().content.toLowerCase();
	}

	dealDamage(amount) {
		this.hp -= amount;
		return this.hp;
	}

	heal(amount) {
		this.hp += amount;
		return this.hp;
	}

	useMP(amount) {
		this.mp -= amount;
		return this.mp;
	}

	changeGuard() {
		this.guard = !this.guard;
		return this.guard;
	}

	forfeit() {
		this.hp = 0;
		return null;
	}

	get canHeal() {
		return this.mp > 0;
	}

	get canSpecial() {
		return this.mp >= 25;
	}

	get canFinal() {
		return this.hp < 100 && this.mp >= 50 && !this.usedFinal;
	}

	toString() {
		return this.user.toString();
	}
};
