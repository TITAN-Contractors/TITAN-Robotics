// require the modules
const fs = require('fs');
const Discord = require('discord.js');
const { cmdprefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	setInterval(() => {
		targetGuild = client.guilds.cache.get('607930707138052108')
		if (targetGuild) {
			client.user.setPresence({
				activity: {
					name: targetGuild.memberCount + ' contractors blaze the trail!',
					type: 'WATCHING'
				},
				status: 'online'
			})
				.then(console.log)
				.catch(console.error);
		}
	}, 1000 * 60 * 5);

});

client.on('message', message => {
	if (!message.content.startsWith(cmdprefix) || message.author.bot) return;

	const args = message.content.slice(cmdprefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(token);