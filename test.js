const { PermissionsBitField } = require('discord.js')
const embed = require('./commands/moderation/embed.js');
console.log(new PermissionsBitField(embed.data.default_member_permissions).toArray())