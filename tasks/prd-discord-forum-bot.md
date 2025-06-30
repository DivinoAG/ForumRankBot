# Product Requirements Document: Discord Forum Post Ranking Bot

## 1. Introduction/Overview
This document outlines the requirements for a Discord bot designed to help server moderators identify popular forum posts within specified forum-type channels. The bot will generate a report listing threads ordered by the number of reactions (votes) they have received, providing insights into community engagement and trending topics.

## 2. Goals
*   To provide server moderators with an easy way to view and analyze the most reacted-to posts in a Discord forum channel.
*   To enable quick identification of popular or important discussions within the community.
*   To support content moderation and community management efforts by highlighting highly engaged threads.

## 3. User Stories
*   **As a server moderator**, I want to trigger a command to get a list of top posts in a specific forum channel, so that I can quickly see which discussions are most popular.
*   **As a server moderator**, I want the report to include the thread name, number of votes, and associated tags, so that I have comprehensive information about each popular post.
*   **As a server moderator**, I want to be able to limit the number of results in the report, so that I can focus on the absolute top posts without being overwhelmed by a long list.
*   **As a server moderator**, I want the option to receive the report as a direct message, so that I can review sensitive information privately or avoid cluttering public channels.

## 4. Functional Requirements
1.  The bot **must** be able to read all threads within a specified Discord forum-type channel.
2.  The bot **must** count reactions on the initial post of each thread.
3.  The bot **must** only count the primary reaction type (default emoji) configured for the channel.
4.  The bot **must** order the threads by the number of reactions in descending order (highest reactions first).
5.  The bot **must** generate a report that includes:
    *   The name of each thread.
    *   The total count of the primary reaction for each thread.
    *   A list of all tags assigned to each thread.
6.  The bot **must** be triggered by a slash command: `/forum-rank`.
7.  The `/forum-rank` command **must** include a required parameter `channel` to specify the target forum channel.
8.  The `/forum-rank` command **must** include an optional parameter `number_of_posts` to limit the results to the top X posts. If not provided, all posts will be listed.
9.  The `/forum-rank` command **must** include an optional boolean parameter `direct_message` (defaulting to `false`) to send the report as a DM to the triggering user instead of the channel.
10. The bot **must** output the report to the same channel where the command was issued by default.
11. The bot **must** be accessible only to server moderators initially. Channel-specific access limitations can be considered as a future enhancement.

12. The bot **must** be deployable to Firebase Functions.
13. The bot **must** utilize Firebase services compatible with the free Spark plan for execution and deployment.
14. The bot **must** be triggered via an HTTP request from a Discord Interaction Endpoint, processed by a Firebase Function.
15. The bot **must** store any necessary persistent data (if identified) using Firebase services compatible with the free Spark plan, such as Firestore or Realtime Database.
16. The bot **must** be configured to handle Discord interactions securely using Firebase Function environment variables for sensitive keys.
## 5. Non-Goals (Out of Scope)
*   The bot will **not** create new threads.
*   The bot will **not** edit or delete existing threads or messages.
*   The bot will **not** interfere with user reactions or thread content in any way.
*   The bot will **not** provide advanced filtering options beyond the specified parameters (e.g., filtering by date, specific tags, or multiple reaction types).
*   User role-based access control beyond general moderator access is out of scope for the initial version.

## 6. Design Considerations
*   The report output should be clear, readable, and well-formatted in Markdown within Discord messages.
*   The bot should respect Discord's message size limits. If the report exceeds the standard message length, it should be sent as an embedded message.

## 7. Technical Considerations
*   The bot will be developed using Node.js and the `discord.js` library.
*   Deployment will be handled using **Firebase Functions** for execution, compatible with the **free Spark plan**.
*   The bot's functionality will be triggered by **HTTP requests** sent from Discord to a Firebase Function endpoint.
*   The bot will need appropriate Discord API permissions to read channel messages, threads, and reactions, as well as `Manage Channels` to check for moderator permissions.
*   The bot is expected to process around 80 threads initially, with an anticipated growth of 5-10 new threads per month.

## 8. Success Metrics
*   Successful deployment and operation on **Firebase Functions**.
*   Moderators are able to successfully use the `/forum-rank` command to generate reports.
*   The generated reports accurately reflect the reaction counts and thread information.