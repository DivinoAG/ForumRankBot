const fetch = require('node-fetch');

const DISCORD_API_BASE = 'https://discord.com/api/v10';

async function discordRequest(endpoint, options) {
    const url = `${DISCORD_API_BASE}${endpoint}`;
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        ...options
    });

    if (!res.ok) {
        const data = await res.json();
        console.error(data);
        throw new Error(JSON.stringify(data));
    }

    return res.json();
}

async function fetchForumThreads(channelId) {
    const endpoint = `/channels/${channelId}/threads/archived/public`;
    return discordRequest(endpoint);
}

async function fetchInitialMessage(threadId) {
    const endpoint = `/channels/${threadId}/messages?limit=1`;
    const messages = await discordRequest(endpoint);
    return messages[0];
}

async function editInteractionResponse(token, message) {
    const endpoint = `/webhooks/${process.env.DISCORD_CLIENT_ID}/${token}/messages/@original`;
    return discordRequest(endpoint, { method: 'PATCH', body: JSON.stringify(message) });
}

async function sendFollowupMessage(token, message) {
    const endpoint = `/webhooks/${process.env.DISCORD_CLIENT_ID}/${token}`;
    return discordRequest(endpoint, { method: 'POST', body: JSON.stringify(message) });
}

async function sendDM(userId, message) {
    const endpoint = `/users/@me/channels`;
    const body = { recipient_id: userId };
    const channel = await discordRequest(endpoint, { method: 'POST', body: JSON.stringify(body) });
    return discordRequest(`/channels/${channel.id}/messages`, { method: 'POST', body: JSON.stringify(message) });
}

module.exports = { fetchForumThreads, fetchInitialMessage, editInteractionResponse, sendFollowupMessage, sendDM };
