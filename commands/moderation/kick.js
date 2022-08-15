const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member')
        .addUserOption(opt => opt.setName("member").setDescription("Member to kick").setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Reason to kick member"))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    usage: "/kick <member> [reason]",
    category: "moderation",
    async execute(client, interaction, args) {
        if (!interaction.inGuild()) return interaction.reply({ content: `This command can only be used in a guild.` });
        let member;
        try {
            member = await interaction.guild.members.fetch(args.member);
        } catch (e) {
            return interaction.reply({ content: `There was an error fetching member`, ephemeral: true })
        }
        if (!member.kickable) return interaction.reply({ content: `I cannot kick this member`, ephemeral: true });
        const kicked = await member.kick({ reason: args.reason });
        await interaction.reply({ content: `Kicked **${kicked.user.tag}**${args.reason ? ` for \`${args.reason}\`` : ''}` });
    },
};