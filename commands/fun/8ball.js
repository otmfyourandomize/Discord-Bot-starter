const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const answers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
]
module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the 8ball a question')
        .addStringOption(opt => opt.setName('question').setDescription("Question to ask the 8ball").setRequired(true)),
    category: "fun",
    async execute(client, interaction, args) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("8Ball")
                    .setDescription(`**Q**: ${args.question}
**A**: ${answers[Math.floor(Math.random() * answers.length)]}`)
                    .setColor("2F3136")
            ]
        });
    },
};