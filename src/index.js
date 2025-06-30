require('dotenv').config();
const { handleForumRank } = require('./commands/forum-rank');

// This file is now primarily for exporting the core application logic
// for use in different environments (e.g., local development, Firebase Functions).

module.exports = { handleForumRank };