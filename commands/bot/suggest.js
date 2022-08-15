const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggests a bot feature'),
    usage: "/suggest",
    category: "bot",
    async execute(client, interaction, args) {
        await interaction.showModal(
            new ModalBuilder()
                .setTitle("Bot Suggestion")
                .setCustomId("bot_suggestion")
                .setComponents([
                    new ActionRowBuilder()
                        .addComponents([
                            new TextInputBuilder()
                                .setLabel("Suggestion")
                                .setCustomId("title")
                                .setPlaceholder("Suggestion")
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                        ]),
                    new ActionRowBuilder()
                        .addComponents([
                            new TextInputBuilder()
                                .setLabel("Description")
                                .setCustomId("description")
                                .setPlaceholder("Describe your suggestion")
                                .setStyle(TextInputStyle.Paragraph)
                                .setRequired(true)
                        ])
                ])
        )
    },
};