console.clear();
require("dotenv").config();
const { Client, Collection, Partials, GatewayIntentBits } = require("discord.js");
const { TOKEN } = process.env;
const fs = require("fs");
const path = require("path");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

//command handler
const COMMANDS_PATH = path.join(__dirname, "commands");
for (const category of fs.readdirSync(COMMANDS_PATH).filter(folder => fs.lstatSync(path.join(COMMANDS_PATH, folder)).isDirectory()))
    for (const file of fs.readdirSync(path.join(COMMANDS_PATH, category)).filter(file => file.endsWith(".js"))) {
        const command = require(path.join(COMMANDS_PATH, category, file));
        client.commands.set(command.data.name, command);
    }

//register event handler
const EVENTS_PATH = path.join(__dirname, "events");
for (const file of fs.readdirSync(EVENTS_PATH).filter(file => file.endsWith(".js"))) {
    const event = require(path.join(EVENTS_PATH, file));
    if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
    else client.on(event.name, (...args) => event.execute(client, ...args));
}
client.on('error', console.warn);
client.login(TOKEN);

require('./server.js')(process.env.PORT || 3000);