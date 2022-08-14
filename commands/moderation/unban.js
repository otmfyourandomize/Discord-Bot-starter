const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a member')
        .addUserOption(opt => opt.setName("member").setDescription("Member to ban").setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Reason to unban member"))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    category: "moderation",
    async execute(client, interaction, args) {
        if (!interaction.inGuild()) return interaction.reply({ content: `This command can only be used in a guild.` });
        const { bans } = interaction.guild;
        let member;
        try {
            member = await bans.fetch(args.member);
        } catch (e) {
            return interaction.reply({ content: `There was an error fetching member`, ephemeral: true })
        }
        if (!member) return interaction.reply({ content: `I couldn't find this member in the server bans`, ephemeral: true });
        const unbanned = await bans.remove(member.user, args.reason);
        await interaction.reply({ content: `Unbanned **${unbanned.tag}**${args.reason ? ` for \`${args.reason}\`` : ''}` });
    },
};