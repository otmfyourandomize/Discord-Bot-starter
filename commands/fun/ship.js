const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

const BACKGROUND = "https://cdn.discordapp.com/attachments/790730773820473355/794654020639260722/background.png";
const BROKEN_HEART = "https://cdn.discordapp.com/attachments/790730773820473355/826624745411575868/broken_heart.png";
const HEART = "https://cdn.discordapp.com/attachments/790730773820473355/794654018944499763/heart.png";
const BEGIN_EMPTY = "<:bar_beginning_empty:794639458648588318>";
const BEGIN = "<:bar_begin_pink:794061719781507104>";
const FULL = "<:bar_full_pink:794061350758121492>";
const HALF = "<:bar_half_pink:794062618456227900>";
const EMPTY = "<:bar_empty:794063321308856321>";
const END_EMPTY = "<:bar_end:794063505635409920>";
const END_HALF = "<:bar_half_end:794642040125521931>";
const END = "<:bar_full_end:794639442669207592>";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ship two members')
        .addUserOption(opt => opt.setName('first').setDescription("First user to ship"))
        .addUserOption(opt => opt.setName('second').setDescription("Second user to ship")),
    usage: "/ship [first] [second]",
    category: "fun",
    async execute(client, interaction, args) {
        let first, second;
        try {
            first = args.first ? await interaction.guild.members.fetch(args.first) : (await interaction.guild.members.fetch({ cache: false })).random();
        } catch (e) {
            first = await interaction.guild.members.fetch({ cache: false }).random();
        }
        try {
            second = args.second ? await interaction.guild.members.fetch(args.second) : (await interaction.guild.members.fetch({ cache: false })).random();
        } catch (e) {
            second = await interaction.guild.members.fetch({ cache: false }).random();
        }
        const canvas = createCanvas(292, 128);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(await loadImage(BACKGROUND), 0, 0, canvas.width, canvas.height);
        ctx.drawImage(await loadImage(first.displayAvatarURL({ extension: "png", dynamic: true, size: 128 })), 0, 0, 128, 128);
        ctx.drawImage(await loadImage(second.displayAvatarURL({ extension: "png", dynamic: true, size: 128 })), 164, 0, 128, 128);
        const percent = [first, second].some(x => x.id == "600356507829141544") && ![first, second].every(x => x.id == "600356507829141544") ? 0 : Math.floor(Math.random() * 100);
        ctx.drawImage(await loadImage(percent < 50 ? BROKEN_HEART : HEART), 0, 0, canvas.width, canvas.height);
        const attachment = new AttachmentBuilder()
            .setFile(canvas.toBuffer())
            .setName("ship.png");
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${first.displayName.slice(0, Math.floor(first.displayName.length / 2))}${second.displayName.slice(Math.floor(second.displayName.length / 2))}`)
                    .setDescription(`**${percent}%** ${new Array(12).fill(0).map((x, i) => {
                        const full = (i + 1) / 12 <= percent / 100;
                        const half = (i + 1) / 12 + (1 / 24) > percent / 100;
                        if (i == 0) return full ? BEGIN : BEGIN_EMPTY;
                        if (i == 11) return full ? half ? END_HALF : END : END_EMPTY
                        return full ? half ? HALF : FULL : EMPTY
                    }).join('')}`)
                    .setImage(`attachment://${attachment.name}`)
                    .setFooter({ text: `${first.displayName} | ${second.displayName}` })
            ], files: [attachment]
        });
    },
};