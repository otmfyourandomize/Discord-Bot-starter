const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Shows the last deleted message in the channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    category: "moderation",
    async execute(client, interaction, args) {
        const msg = client.snipes.get(interaction.channelId);
        if (msg == null) return interaction.reply({ content: "Couldn't find any deleted messages in this channel!", ephemeral: true })
        const embed = new EmbedBuilder()
            .setTitle(`Sniped ${msg.author.tag}`)
            .setDescription(msg.content);
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};