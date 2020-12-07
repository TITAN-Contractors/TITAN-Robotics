// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

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
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});

// login to Discord with your app's token
client.login(token);