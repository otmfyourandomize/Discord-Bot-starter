const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var sacrify = [
    "to **Cthulu**",
    "to **The Flying Spaghetti Monster**",
    "to **the Illuminati**",
    "to **Ben Brode**",
    "to **a local school district**",
    "to **a giant squid**",
    "to **Herobrine**",
    "to **the devil**",
    "to **RNGesusJoe**",
    "to **Bob**",
    "to **get the iPhone 13**",
    "to **Santa Claus**",
    "to **cure cancer**",
    "to **create a new meme**",
    "to **Nyarlathotep**",
    "to **Yogg-Saron**",
    "to **N'Zoth**",
    "to **Y'Shaarj**",
    "to **C'Thun**",
    "to **McDonalds**",
    "to **Dictator Advaith**",
    "to **Slenderman**",
    "to **your mom**",
    "to **escape the backrooms**",
    "for **the vine**",
    "for **yt views**",
    "to **Candice**",
    "to **Joe**",
    "to **Tom Holland**",
    "to **Peter Griffin**",
    "for **the funni**",
    "for **calling them gay**",
    "because **they posted cringe**",
    "for **making an offensive tweet**",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sacrifice')
        .setDescription('Sacrifice someone/something')
        .addStringOption(opt => opt.setName("target").setDescription("Target to sacrifice").setRequired(true))
        .addStringOption(opt => opt.setName("sacrify").setDescription("What to sacrifice target to")),
    usage: "/kill <target>",
    category: "fun",
    async execute(client, interaction, args) {
        await interaction.reply({ content: `${interaction.member.displayName} sacrificed ${args.target} ${args.sacrify ? `to ${args.sacrify}` : sacrify[Math.floor(Math.random() * sacrify.length)]}` });
    },
};