const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Shows the last deleted message in the channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    usage: "/snipe",
    category: "moderation",
    async execute(client, interaction, args) {
        const msg = client.snipes.get(interaction.channelId);
        if (msg == null) return interaction.reply({ content: "Couldn't find any deleted messages in this channel!", ephemeral: true });
        await interaction.reply({
            content: `**Sniped from ${msg.author.tag}**\n${msg.content}`,
            embeds: msg.embeds,
            files: [...msg.attachments].map(([key, { proxyURL, url, name, description }]) => new AttachmentBuilder(proxyURL || url, { name, description })),
            ephemeral: true
        })
    },
};