const { EmbedBuilder } = require('discord.js');

const MAX_MESSAGE_LENGTH = 2000;
const MAX_EMBED_DESCRIPTION_LENGTH = 4096;

function formatDiscordMessage(content, title) {

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(content.length > MAX_EMBED_DESCRIPTION_LENGTH ? content.substring(0, MAX_EMBED_DESCRIPTION_LENGTH - 3) + '...' : content)
        .setColor(0x0099FF);
    return { embeds: [embed] };
}

module.exports = {
    formatDiscordMessage,
};
