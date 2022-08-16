const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const murders = [
    "brutally murdered **{target}**",
    "stabbed **{target}** to death",
    "strangled **{target}**",
    "snapped **{target}**'s neck",
    "killed **{target}** of bordom",
    "killed **{target}**",
    "snapped **{target}** out of existence",
    "blew up **{target}**",
    "set **{target}** on fire",
    "force choked **{target}**",
    "electrified **{target}**",
    "smothered **{target}**",
    "beat **{target}** to Russian Roulette",
    "lost a bet against **{target}**",
    "bit off **{target}**'s head",
    "bashed **{target}**'s head in with a hammer",
    "went PLUS ULTRA on **{target}**",
    "forgot what mercy was whilst fighting **{target}**",
    "drop kicked **{target}** off a cliff",
    "crushed **{target}**",
    "threw **{target}** under a car",
    "sent **{target}** to Tartarus"
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Kill someone/something')
        .addStringOption(opt => opt.setName('target').setDescription("Target to kill").setRequired(true)),
    usage: "/kill <target>",
    category: "fun",
    async execute(client, interaction, args) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("RIP")
                    .setDescription(`${interaction.member.toString()} ${murders[Math.floor(Math.random() * murders.length)].replace('{target}', args.target)}`)
                    .setColor(interaction.member.displayHexColor === "#000000" ? "#ffffff" : interaction.member.displayHexColor)
            ]
        });
    },
};