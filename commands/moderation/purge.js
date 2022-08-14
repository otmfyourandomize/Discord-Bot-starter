const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Bulk deletes messages younger than 2 weeks')
        .addNumberOption(opt => opt.setName("amount").setDescription("Amount of messages to delete").setRequired(true).setMaxValue(100).setMinValue(0))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    category: "moderation",
    async execute(client, interaction, args) {
        const messages = await interaction.channel.bulkDelete(args.amount, true);
        await interaction.reply({ content: `Purged ${messages.size} messages`, ephemeral: true });
    },
};