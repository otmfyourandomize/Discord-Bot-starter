const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member')
        .addUserOption(opt => opt.setName("member").setDescription("Member to ban").setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Reason to ban member"))
        .addIntegerOption(opt => opt.setName("purge").setDescription("Number of days of messages to delete"))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    usage: "/ban <member> [reason] [purge]",
    category: "moderation",
    async execute(client, interaction, args) {
        if (!interaction.inGuild()) return interaction.reply({ content: `This command can only be used in a guild.` });
        let member;
        try {
            member = await interaction.guild.members.fetch(args.member);
        } catch (e) {
            return interaction.reply({ content: `There was an error fetching member`, ephemeral: true })
        }
        if (!member.bannable) return interaction.reply({ content: `I cannot ban this member`, ephemeral: true });
        const banned = await member.ban({ reason: args.reason, deleteMessageDays: args.purge });
        await interaction.reply({ content: `Banned **${banned.user.tag}**${args.reason ? ` for \`${args.reason}\`` : ''}${args.purge ? ` and deleted last ${args.purge} days of messages` : ''}` });
    },
};