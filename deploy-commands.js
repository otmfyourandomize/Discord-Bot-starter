require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId } = require('./config.json');
const { TOKEN } = process.env;
const path = require('path');
const fs = require('fs');
const COMMANDS_PATH = path.join(__dirname, 'commands');

const commands = [];

for (const category of fs.readdirSync(COMMANDS_PATH).filter(folder => fs.lstatSync(path.join(COMMANDS_PATH, folder)).isDirectory())) for (const file of fs.readdirSync(path.join(COMMANDS_PATH, category)).filter(file => file.endsWith('.js'))) commands.push(require(path.join(COMMANDS_PATH, category, file)).data.toJSON());
console.log(commands)
const rest = new REST({ version: '9' }).setToken(TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);