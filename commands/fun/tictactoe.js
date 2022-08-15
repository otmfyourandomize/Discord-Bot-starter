const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { TicTacToe } = require('tictactoejs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription("Play a game of tictactoe")
        .addUserOption(opt => opt.setName('member').setDescription("Member to play against").setRequired(true)),
    usage: "/tictactoe <member>",
    category: "fun",
    async execute(client, interaction, args) {
        let opponent;
        try {
            opponent = await interaction.guild.members.fetch(args.member);
        } catch (e) {
            return interaction.reply({ content: `I couldn't find this member`, ephemeral: true });
        }
        if (opponent.user.bot) return interaction.reply({ content: `You can't play against a bot`, ephemeral: true });
        const game = new TicTacToe();
        const players = {
            X: opponent,
            O: interaction.member
        };
        const emojis = { "X": "❌", "O": "⭕", [null]: "➖" };
        const styles = {
            "X": ButtonStyle.Primary,
            "O": ButtonStyle.Success,
            [null]: ButtonStyle.Secondary
        }
        function getButtons(disable = false) {
            const components = [];
            for (let j = 0; j < 3; j++)
                for (let i = 0; i < 3; i++) {
                    components[j] ||= new ActionRowBuilder();
                    components[j].addComponents([
                        new ButtonBuilder()
                            .setCustomId(`${i + 1}-${j + 1}`)
                            .setDisabled(disable || !!game.get(i + 1, j + 1))
                            .setEmoji(emojis[game.get(i + 1, j + 1)])
                            .setStyle(styles[game.get(i + 1, j + 1)])
                    ]);
                }
            return components;
        }
        const msg = await interaction.reply({
            content: `**TicTacToe** | ${players[game.turn()].toString()} (${emojis[game.turn()]})`,
            components: getButtons()
        });
        play(msg);
        async function play(msg) {
            let button;
            try {
                button = await new Promise((res, rej) => {
                    const collector = msg.createMessageComponentCollector({ time: 30_000 });
                    let btn;
                    collector.on('collect', button => {
                        if (button.user.id != players[game.turn()].id) return button.reply({ content: `This is not your interaction!`, ephemeral: true });
                        btn = button;
                        button.deferUpdate()
                        collector.stop();
                    });
                    collector.on('end', () => {
                        if (!btn) return rej();
                        res(btn);
                    });
                });
            } catch (e) {
                await interaction.editReply({ components: getButtons(true) })
                return interaction.followUp({ content: `Opponent took too long` });
            }
            game.move(...button.customId.split('-').map(Number));
            if (game.status() === "in progress") {
                await interaction.editReply({
                    content: `**TicTacToe** | ${players[game.turn()].toString()} (${emojis[game.turn()]})`,
                    components: getButtons()
                });
                return play(msg);
            }
            await interaction.editReply({
                content: `**TicTacTow** | ${game.status() === "draw" ? "DRAW" : `${players[game.status()].toString()} WON (${emojis[game.status()]})`}`,
                components: getButtons(true)
            });
        }
    },
};