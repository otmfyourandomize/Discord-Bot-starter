const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

const BACKGROUND = "https://cdn.discordapp.com/attachments/790730773820473355/794654020639260722/background.png";
const BROKEN_HEART = "https://cdn.discordapp.com/attachments/790730773820473355/826624745411575868/broken_heart.png";
const HEART = "https://cdn.discordapp.com/attachments/790730773820473355/794654018944499763/heart.png";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ship two members')
        .addUserOption(opt => opt.setName('first').setDescription("First user to ship"))
        .addUserOption(opt => opt.setName('second').setDescription("Second user to ship")),
    usage: "/ship [first] [second]",
    category: "fun",
    async execute(client, interaction, args) {
        await interaction.deferReply();
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
        const percent = [first, second].some(x => x.id == process.env.OWNER_ID) && ![first, second].every(x => x.id == process.env.OWNER_ID) ? 0 : Math.round(Math.random() * 100);
        ctx.drawImage(await loadImage(percent < 50 ? BROKEN_HEART : HEART), 0, 0, canvas.width, canvas.height);
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "ship.png" });
        let key = ({
            a: "<:bar_begin_full:1054129337772818463>",
            b: "<:bar_begin_half:1054129392042905670>",
            c: "<:bar_begin_empty:1054129371880898600>",
            d: "<:bar_full:1054129420677427240>",
            e: "<:bar_half:1054129486129537074>",
            f: "<:bar_empty:794063321308856321>",
            g: "<:bar_end_full:1054129510158696591>",
            h: "<:bar_end_half:1054129609286889604>",
            i: "<:bar_end_empty:1054129552332423188>"
        });
        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${first.displayName.slice(0, Math.floor(first.displayName.length / 2))}${second.displayName.slice(Math.floor(second.displayName.length / 2))}`)
                    .setDescription(`**${percent}%** ${Array(24).fill().map((x, i) => i < Math.round(percent / 100 * 24)).reduce((a, b, i, arr) => (a += (i % 2 == 1 ? "" : i == 0 ? b ? arr[i + 1] ? "a" : "b" : "c" : i == arr.length - 2 ? b ? arr[i + 1] ? "g" : "h" : "i" : b ? arr[i + 1] ? arr[i + 2] ? "d" : "g" : "e" : "f"), a), "").split('').map(x => key[x]).join('')}`)
                    .setImage(`attachment://${attachment.name}`)
                    .setFooter({ text: `${first.displayName} | ${second.displayName}` })
            ], files: [attachment]
        });
    },
};