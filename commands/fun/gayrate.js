const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gayrate')
        .setDescription("Rates how gay someone is")
        .addUserOption(opt => opt.setName('target').setDescription("Person to rate")),
    usage: "/gayrate [member]",
    category: "fun",
    async execute(client, interaction, args) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Gay Rate")
                    .setDescription(`${(args.target ? await interaction.guild.members.fetch(args.target) : interaction.member).toString()} is ${args.target == "600356507829141544" ? 0 : Math.floor(Math.random() * 100)}% gay`)
                    .setColor("2F3136")
            ]
        });
    },
};