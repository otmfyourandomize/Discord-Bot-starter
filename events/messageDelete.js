module.exports = {
    name: 'messageDelete',
    execute(client, message) {
        client.snipes.set(message.channelId, message);
    },
};