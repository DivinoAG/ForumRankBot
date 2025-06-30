require('dotenv').config();
const { REST, Routes } = require('discord.js');
const forumRankCommand = require('../src/commands/forum-rank.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
            { body: [forumRankCommand.data.toJSON()] },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Failed to reload application (/) commands:', error);
    }
})();
