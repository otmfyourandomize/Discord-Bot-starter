const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Gets member avatar')
        .addUserOption(opt => opt.setName("member").setDescription("Member to get avatar of")),
    usage: "/avatar [member]",
    category: "info",
    async execute(client, interaction, args) {
        let target;
        try {
            target = await interaction.guild.members.fetch(args.member || interaction.user);
        } catch {
            target = interaction.member;
        }
        await interaction.reply({ files: [new AttachmentBuilder().setName("avatar.png").setFile(target.displayAvatarURL({ extension: "png", dynamic: true, size: 4096 }))], ephemeral: true });
    },
};