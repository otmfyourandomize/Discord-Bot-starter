module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({ status: 'idle', afk: true, activities: [{ name: "/help", type: 2 }] });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};