const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Get pp length')
        .addUserOption(opt => opt.setName('target').setDescription("Person to measure pp length of")),
    usage: "/8ball <question>",
    category: "fun",
    async execute(client, interaction, args) {
        console.log(args)
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${(args.target || interaction.user).tag}'s pp`)
                    .setDescription(`8${new Array(Math.floor(((args.target || interaction.user).id == process.env.OWNER_ID ? 1 : Math.random()) * 20)).fill('=').join('')}D`)
                    .setColor("2F3136")
            ]
        });
    },
};