const { fetchForumThreads, fetchInitialMessage, editInteractionResponse, sendFollowupMessage, sendDM } = require('../utils/discord-api');
const { generateReportString } = require('../utils/report-generator');
const { formatDiscordMessage } = require('../utils/message-formatter');
const fs = require('fs');
const path = require('path');

async function handleForumRank(interaction) {
    const options = interaction.data.options.reduce((acc, option) => {
        acc[option.name] = option.value;
        return acc;
    }, {});

    const { channel: channelId, number_of_posts: numberOfPosts, direct_message: directMessage } = options;

    try {
        const threads = await fetchForumThreads(channelId);

        const threadData = [];
        for (const thread of threads.threads) {
            const initialMessage = await fetchInitialMessage(thread.id);
            if (initialMessage) {
                const reaction = initialMessage.reactions?.find(r => r.emoji.id === null && r.emoji.name === '👍'); // Assuming default emoji is 👍
                const reactionCount = reaction ? reaction.count : 0;
                threadData.push({
                    name: thread.name,
                    reactionCount: reactionCount,
                    tags: [], // Tags are not available in the threads list endpoint
                });
            }
            await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay between each request
        }

        threadData.sort((a, b) => b.reactionCount - a.reactionCount);

        const finalThreadData = numberOfPosts ? threadData.slice(0, numberOfPosts) : threadData;

        const debugFilePath = path.resolve('/tmp', 'post_data_debug.json');
        fs.writeFileSync(debugFilePath, JSON.stringify(threadData, null, 2));

        const chunkSize = 50;
        for (let i = 0; i < finalThreadData.length; i += chunkSize) {
            const chunk = finalThreadData.slice(i, i + chunkSize);
            const reportString = generateReportString(chunk, i);
            const title = `Top forum posts by reactions (Entries ${i + 1}-${i + chunk.length})`;
            const messageOptions = formatDiscordMessage(reportString, title);

            if (directMessage) {
                await sendDM(interaction.member.user.id, messageOptions);
            } else {
                if (i === 0) {
                    await editInteractionResponse(interaction.token, messageOptions);
                } else {
                    await sendFollowupMessage(interaction.token, messageOptions);
                }
            }
        }

        if (directMessage) {
            await editInteractionResponse(interaction.token, { content: 'Report sent to your DMs.' });
        }

    } catch (error) {
        console.error('Error processing top-posts command:', error);
        await editInteractionResponse(interaction.token, {
            content: 'An error occurred while processing your request. Please try again later.',
        });
    }
}

module.exports = { handleForumRank };