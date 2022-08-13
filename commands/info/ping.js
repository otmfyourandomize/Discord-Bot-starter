const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gets bot ping'),
    category: "info",
    async execute(client, interaction, args) {
        let before = Date.now();
        await interaction.reply({
            embeds: [{
                description: "Looks like this bot is slow...",
                color: 0x2F3136
            }],
            ephemeral: true
        });
        await interaction.editReply({
            embeds: [{
                author: { name: "🏓 Pong!" },
                fields: [
                    {
                        name: "API Latency",
                        value: "`" + Math.round(client.ws.ping) + "`",
                        inline: true
                    },{
                        name: "Message Latency",
                        value: "`" + (Date.now() - before) + "`",
                        inline: true
                    }
                ],
                color: 0x2F3136
            }]
        });
    },
};