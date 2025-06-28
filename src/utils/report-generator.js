function generateReportString(threadData, startIndex = 0) {
    if (!threadData || threadData.length === 0) {
        return "No threads found or processed.";
    }

    const entries = threadData.map((thread, index) => {
        const lines = [];
        lines.push(`**${startIndex + index + 1}) ${thread.name}**`);
        lines.push(`Votes: ${thread.reactionCount}`);
        if (thread.tags && thread.tags.length > 0) {
            lines.push(`Tags: ${thread.tags.join(', ')}`);
        }
        return lines.join('\n');
    });

    return entries.join('\n\n');
}

module.exports = {
    generateReportString,
};

