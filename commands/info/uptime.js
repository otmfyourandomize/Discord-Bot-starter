const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Gets bot uptime'),
    usage: "/uptime",
    category: "info",
    async execute(client, interaction, args) {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 360000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Uptime")
                    .setDescription(`${days ? `${days} day${days == 1 ? '' : 's'} ` : ''}${hours ? `${hours} hour${hours == 1 ? '' : 's'} ` : ''}${minutes ? `${minutes} minute${minutes == 1 ? '' : 's'} ` : ''}${seconds ? `${seconds} second${seconds == 1 ? '' : 's'}` : ''}`)
                    .setColor("2F3136")
            ]
        });
    },
};