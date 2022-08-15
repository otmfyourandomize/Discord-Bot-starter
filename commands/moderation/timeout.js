const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts a member')
        .addUserOption(opt => opt.setName("member").setDescription("Member to timout").setRequired(true))
        .addNumberOption(opt => opt.setName("minutes").setDescription("Timeout in minutes").setMaxValue(40319).setRequired(true))
        .addStringOption(opt => opt.setName("reason").setDescription("Reason to timeout member"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    usage: "/timeout <member> <minutes> [reason]",
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
        const time = args.minutes * 60000;
        console.log(args)
        const timedout = await member.timeout(time == 0 ? null : time, args.reason);
        const days = Math.floor(time / 86400000);
        const hours = Math.floor(time / 3600000) % 24;
        const minutes = Math.floor(time / 60000) % 60;
        const seconds = Math.floor(time / 1000) % 60;
        await interaction.reply({ content: `Timed out **${timedout.user.tag}** for ${days ? days + ` day${days != 1 ? 's' : ''} ` : ''}${hours ? hours + ` hour${hours != 1 ? 's' : ''} ` : ''}${minutes ? minutes + ` minute${minutes != 1 ? 's' : ''} ` : ''}${seconds ? seconds + ` second${seconds != 1 ? 's' : ''} ` : ''}${args.reason ? ` | \`${args.reason}\`` : ''}` });
    },
};