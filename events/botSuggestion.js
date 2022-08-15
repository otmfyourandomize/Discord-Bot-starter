const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isModalSubmit() || interaction.customId !== "bot_suggestion" || require("../blacklisted.js")(interaction)) return;
        const { title, description } = Object.fromEntries([...interaction.fields.fields].map(x => [x[0], x[1].value]));
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Submitted by ${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
            .setTitle(title)
            .setDescription(description)
            .setColor("#2F3136")
            .setTimestamp(new Date(Date.now()));
        try {
            const guild = await client.guilds.fetch("770424929627144242");
            const channel = await guild.channels.fetch("1008873275616669778");
            await channel.send({ embeds: [embed] });
            return interaction.reply({ content: "Your suggestion has been submitted.", ephemeral: true });
        } catch(e) {
            console.log(e)
            return interaction.reply({ content: "There was an error sending your suggestion", ephemeral: true });
        }
    },
};