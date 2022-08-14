const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isModalSubmit() || interaction.customId !== "create_embed") return;
        const { title, description, color } = Object.fromEntries([...interaction.fields.fields]);
        const embed = new EmbedBuilder()
            .setTitle(title.value)
            .setDescription(description.value)
            .setColor(/^[0-9A-F]{6}$/i.test(color.value.replace('#', '')) ? color.value : "#2F3136")
        return interaction.reply({ embeds: [embed] })
    },
};