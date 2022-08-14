const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a member')
        .addUserOption(opt => opt.setName("member").setDescription("Member to timout").setRequired(true))
        .addNumberOption(opt => opt.setName("time").setDescription("Timeout in minutes").setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Reason to timeout member"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    category: "moderation",
    async execute(client, interaction, args) {
        if (!interaction.inGuild()) return interaction.reply({ content: `This command can only be used in a guild.` });
        let member;
        try {
            member = await interaction.guild.members.fetch(args.member);
        } catch (e) {
            return interaction.reply({ content: `There was an error fetching member`, ephemeral: true })
        }
        if (!member.moderatable) return interaction.reply({ content: `I cannot timeout this member`, ephemeral: true });
        const timedout = await member.timeout(args.time, args.reason);
        await interaction.reply({ content: `Timed out **${timedout.user.tag}** for ${args.time}${args.reason ? ` | \`${args.reason}\`` : ''}` });
    },
};