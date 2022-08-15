module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand() || require("../blacklisted.js")(interaction)) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(client, interaction, Object.fromEntries(interaction.options._hoistedOptions.map(({name, value}) => [name, value])));
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    },
};