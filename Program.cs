using Discord;
using Discord.WebSocket;
using System;
using System.Threading.Tasks;
using System.IO;
public class Program
{
	public static void Main(string[] args)
		=> new Program().MainAsync().GetAwaiter().GetResult();

	private DiscordSocketClient _client;
	private int lengthOfCommand;

	public async Task MainAsync()
	{
		_client = new DiscordSocketClient();
		_client.MessageReceived += CommandHandler;
		_client.Log += Log;

		var token = File.ReadAllText("token.txt");

		await _client.LoginAsync(TokenType.Bot, token);
		await _client.StartAsync();

		await Task.Delay(-1);
	}

	private Task Log(LogMessage message)
	{
		Console.WriteLine(message.ToString());
		return Task.CompletedTask;
	}

	private Task CommandHandler(SocketMessage message)
	{
		string command = "";
		//Filtering messages
		if (!message.Content.StartsWith("!$")) //Prefix
			return Task.CompletedTask;

		if (message.Author.IsBot) //Ignore Bot messages
			return Task.CompletedTask;

		if (message.Content.Contains(' '))
			lengthOfCommand = message.Content.IndexOf(' ');
		else
			lengthOfCommand = message.Content.Length;


		command = message.Content.Substring(2, lengthOfCommand - 2).ToLower();
		//Commands from here
		if (command.Equals("Hello"))
			message.Channel.SendMessageAsync("Hello!");

		return Task.CompletedTask;
	}
}