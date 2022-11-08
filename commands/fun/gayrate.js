const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gayrate')
        .setDescription("Rates how gay someone is")
        .addUserOption(opt => opt.setName('target').setDescription("Person to rate")),
    usage: "/gayrate [member]",
    category: "fun",
    async execute(client, interaction, args) {
        const target = args.target || interaction.user;
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Gay Rate")
                    .setDescription(`${target.toString()} is ${target.id == process.env.OWNER_ID ? 0 : Math.floor(Math.random() * 100)}% gay`)
                    .setColor("2F3136")
            ]
        });
    },
};