const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
                        name: `${capitalize(command)} command`,
                        icon_url: interaction.member.avatarURL() || interaction.member.user.avatarURL()
                    },
                    description: `**${capitalize(cmd.category)}** : ` + cmd.data.description,
                    fields: [
                        {
                            name: "Usage",
                            value: '`' + (cmd.usage || `/${cmd.data.name}`) + '`',
                            inline: true
                        },
                        (cmd.aliases?.length && {
                            name: "Aliases",
                            value: '`' + cmd.aliases.join('` `') + '`',
                            inline: true
                        }),
                        (cmd.data.default_member_permissions && {
                            name: "Required Permissions",
                            value: '`' + new PermissionsBitField(cmd.data.default_member_permissions).toArray().join('` `') + '`'
                        })
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
                    fields: Object.entries(commands).map(([category, cmd]) => ([category === "undefined" ? "Unknown" : category, cmd])).map(([category, commands]) => ({ name: capitalize(category), value: "`" + commands.join('` `') + "`", inline: true })),
                    color: 0x2F3136
                }
            ]), ephemeral: true
        });
    }
}