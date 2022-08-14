const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Gets list of commands or info of one")
        .addStringOption(option => option.setName("command").setDescription("Command to get help on")),
    usage: "/help [command]",
    aliases: ["h", "cmd"],
    category: "info",
    async execute(client, interaction, args) {
        var commands = Object.fromEntries(
            Array.from(new Set(Array.from(client.commands).map(([name, cmd]) => cmd.category))).map((category) => ([category, Array.from(client.commands).filter(([name, cmd]) => cmd.category == category).map(([name, cmd]) => name)]))
        );
        var { command } = args;
        var commandExists = false;
        var cmd = client.commands.get(command);
        if (cmd) commandExists = true;
        await interaction.reply({
            content: (!commandExists && command) ? `Command: \`${command}\` does not exist.` : null,
            embeds: commandExists ? ([
                {
                    author: {
                        name: `${command.charAt(0).toUpperCase() + command.slice(1)} command`,
                        icon_url: interaction.member.avatarURL() || interaction.member.user.avatarURL()
                    },
                    description: `**${cmd.category}** : ` + cmd.data.description,
                    fields: [
                        {
                            name: "Usage",
                            value: '`' + (cmd.usage || `/${cmd.data.name}`) + '`',
                            inline: true
                        },
                        (cmd.aliases?.length ? {
                            name: "Aliases",
                            value: '`' + cmd.aliases.join('` `') + '`',
                            inline: true
                        } : null),
                        (cmd.authorPermissions?.length ? {
                            name: "Required Author Permissions",
                            value: '`' + cmd.authorPermissions.join('` `') + '`'
                        } : null),
                        (cmd.botPermissions?.length ? {
                            name: "Required Bot Permissions",
                            value: '`' + cmd.botPermissions.join('` `') + '`'
                        } : null)
                    ].filter(Boolean),
                    footer: { text: `Syntax: <> = required, [] = optional, || = or` },
                    color: 0x2F3136
                }
            ]) : ([
                {
                    author: {
                        name: "Commands",
                        icon_url: interaction.member.avatarURL() || interaction.member.user.avatarURL()
                    },
                    fields: Object.entries(commands).map(([category, cmd]) => ([category === "undefined" ? "Unknown" : category, cmd])).map(([category, commands]) => ({ name: category.charAt(0).toUpperCase() + category.slice(1), value: "`" + commands.join('` `') + "`", inline: true })),
                    color: 0x2F3136
                }
            ]), ephemeral: true
        });
    }
}