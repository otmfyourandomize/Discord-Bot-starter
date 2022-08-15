const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Creates an embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.EmbedLinks),
    usage: "/embed",
    category: "moderation",
    async execute(client, interaction, args) {
        const modal = new ModalBuilder()
            .setTitle("Create Embed")
            .setCustomId(`create_embed`)
            .addComponents(
                new ActionRowBuilder()
                    .addComponents([
                        new TextInputBuilder()
                            .setCustomId('title')
                            .setLabel("Title")
                            .setPlaceholder("Embed title")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ]),
                new ActionRowBuilder()
                    .addComponents([
                        new TextInputBuilder()
                            .setCustomId('description')
                            .setLabel("Description")
                            .setPlaceholder("Embed description")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                    ]),
                new ActionRowBuilder()
                    .addComponents([
                        new TextInputBuilder()
                            .setCustomId('color')
                            .setLabel("Color")
                            .setPlaceholder("Embed color (optional)")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(false)
                    ])
            );
        return interaction.showModal(modal);
    },
};