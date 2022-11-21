const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Pega o arquivos da pasta commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construir e preparar um instância do módulo REST
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Start, total de comados = ${commands.length}`);

		
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Total de comandos carregados com sucesso: ${data.length}`);
	} catch (error) {
		console.error(error);
	}
})();