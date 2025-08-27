const { ChannelType } = require('discord.js');

async function fetchForumThreads(channel) {
    if (channel.type !== ChannelType.GuildForum) {
        throw new Error('Provided channel is not a forum channel.');
    }

    console.log(`Fetching threads for channel: ${channel.name}`);

    const fetchedIds = new Set();

    // Fetch all active threads
    const activeThreadsCollection = await channel.threads.fetchActive();
    const activeThreads = [];
    activeThreadsCollection.threads.forEach(thread => {
        if (!fetchedIds.has(thread.id)) {
            activeThreads.push(thread);
            fetchedIds.add(thread.id);
        }
    });
    console.log(`Found ${activeThreads.length} active threads.`);

    // Fetch all archived threads with pagination
    let allArchivedThreads = [];
    let lastThread = null;
    let hasMore = true;

    while (hasMore) {
        const options = { limit: 100 };
        if (lastThread) {
            options.before = lastThread.id;
        }

        const archivedThreads = await channel.threads.fetchArchived(options);
        if (archivedThreads.threads.size > 0) {
            const sortedThreads = Array.from(archivedThreads.threads.values()).sort((a, b) => b.id.localeCompare(a.id));
            sortedThreads.forEach(thread => {
                if (!fetchedIds.has(thread.id)) {
                    allArchivedThreads.push(thread);
                    fetchedIds.add(thread.id);
                }
            });
            lastThread = sortedThreads[sortedThreads.length - 1];
        }
        hasMore = archivedThreads.hasMore;
        console.log(`Fetched a batch of ${archivedThreads.threads.size} archived threads. Total archived so far: ${allArchivedThreads.length}. Has more: ${hasMore}`);
    }

    console.log(`Found ${allArchivedThreads.length} archived threads in total.`);

    // Combine active and archived threads
    return [...activeThreads, ...allArchivedThreads];
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
