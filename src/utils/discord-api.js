const { ChannelType } = require('discord.js');

async function fetchForumThreads(channel) {
    if (channel.type !== ChannelType.GuildForum) {
        throw new Error('Provided channel is not a forum channel.');
    }

    const activeThreads = await channel.threads.fetch({ archived: false });
    const archivedThreads = await channel.threads.fetch({ archived: true });

    const allThreads = [...activeThreads.threads.values(), ...archivedThreads.threads.values()];

    return allThreads;
}

async function fetchInitialMessage(thread) {
    try {
        return await thread.fetchStarterMessage();
    } catch (error) {
        console.error(`Failed to fetch starter message for thread ${thread.id}:`, error);
        return null;
    }
}

module.exports = {
    fetchForumThreads,
    fetchInitialMessage,
};
