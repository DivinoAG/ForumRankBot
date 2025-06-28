# ForumRank Bot

This Discord bot helps server moderators identify popular forum posts within specified forum-type channels by generating a report listing threads ordered by the number of reactions (votes) they have received.

## Features

-   **`/forum-rank` Slash Command**: Lists top posts in a forum channel.
    -   **`channel` (required)**: The forum channel to analyze.
    -   **`number_of_posts` (optional)**: Limits the results to the top X posts. Defaults to all posts.
    -   **`direct_message` (optional)**: Sends the report as a direct message to the user. Defaults to `false` (sends to channel).
-   Counts only the primary reaction (default emoji) on the initial post of each thread.
-   Accessible only to server moderators.

## Setup Instructions

### 1. Project Initialization

1.  **Clone the repository (if applicable) or create a new directory:**
    ```bash
    git clone <your-repo-url>
    cd discord-forum-bot
    # OR
    mkdir discord-forum-bot
    cd discord-forum-bot
    ```
2.  **Initialize Node.js project:**
    ```bash
    npm init -y
    ```
3.  **Install dependencies:**
    ```bash
    npm install discord.js dotenv
    ```

### 2. Discord Bot Setup

1.  **Create a new Discord Application:**
    -   Go to the [Discord Developer Portal](https://discord.com/developers/applications).
    -   Click on `New Application`.
    -   Give your application a name (e.g., `ForumRankBot`) and click `Create`.

2.  **Create a Bot User:**
    -   In your application's settings, navigate to `Bot` on the left sidebar.
    -   Click `Add Bot` and confirm.
    -   **IMPORTANT**: Under `Privileged Gateway Intents`, enable `PRESENCE INTENT`, `SERVER MEMBERS INTENT`, and `MESSAGE CONTENT INTENT`.

3.  **Get your Bot Token:**
    -   On the `Bot` page, click `Reset Token` and copy the token. **Keep this token secret!**

4.  **Get your Client ID:**
    -   Navigate to `General Information` on the left sidebar.
    -   Copy the `Application ID`. This is your `DISCORD_CLIENT_ID`.

5.  **Invite the Bot to your Server:**
    -   Go to `OAuth2` -> `URL Generator`.
    -   Under `SCOPES`, select `bot` and `applications.commands`.
    -   Under `BOT PERMISSIONS`, select the following:
        -   `View Channels`
        -   `Send Messages`
        -   `Manage Channels` (required for the bot to check moderator permissions)
        -   `Read Message History`
    -   Copy the generated URL and paste it into your browser to invite the bot to your desired server.

### 3. Environment Variables

1.  Create a file named `.env` in the root of your project (same level as `package.json`).
2.  Add the following lines to your `.env` file, replacing the placeholders with your actual values:
    ```
    DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
    DISCORD_CLIENT_ID=YOUR_CLIENT_ID_HERE
    DISCORD_GUILD_ID=YOUR_GUILD_ID_HERE # The ID of the Discord server (guild) where you want to register slash commands for development. For global commands, this is not needed.
    ```
    -   To get your `GUILD_ID`, enable Developer Mode in Discord (User Settings -> Advanced -> Developer Mode), then right-click on your server icon and select `Copy ID`.

### 4. Running the Bot Locally

1.  **Start the bot:**
    ```bash
    npm start
    # Or for development with potential restarts (if you set up a dev script):
    # npm run dev
    ```

### 5. Deployment to Railway

Railway is a platform that allows you to deploy your applications with ease, and it's well-suited for long-running Discord bots.

1.  **Create a Railway Account:**
    -   If you don't have one, sign up at [https://railway.app/](https://railway.app/).

2.  **Create a New Project:**
    -   From your Railway dashboard, click "New Project".
    -   You can choose to "Deploy from GitHub Repo" (recommended for continuous deployment) or "Deploy a Starter Template" / "Empty Project". If deploying from GitHub, connect your repository.

3.  **Configure Environment Variables:**
    -   In your Railway project, go to the "Variables" tab.
    -   Add the following environment variables, replacing the placeholders with your actual values:
        -   `DISCORD_BOT_TOKEN`: Your bot's token.
        -   `DISCORD_CLIENT_ID`: Your bot's client ID.
        -   `DISCORD_GUILD_ID`: The ID of your development guild (if you're registering guild commands).
    -   **Important**: Do not commit your `.env` file to version control.

4.  **Set Build and Start Commands:**
    -   Railway usually auto-detects Node.js projects.
    -   Ensure your "Build Command" is `npm install` (or `yarn install` if you use Yarn).
    -   Ensure your "Start Command" is `node src/index.js`.

5.  **Deploy:**
    -   If you connected a GitHub repository, Railway will automatically deploy on pushes to your main branch.
    -   Otherwise, you can manually trigger a deploy from the "Deployments" tab.

6.  **Register Slash Commands:**
    -   Your bot will register slash commands when it starts. Ensure your `DISCORD_CLIENT_ID` and `DISCORD_GUILD_ID` (if registering guild-specific commands) are correctly set as environment variables on Railway.
    -   The bot needs to be running for the commands to be registered.

## Project Structure

```
discord-forum-bot/
├── .env
├── package.json
├── src/
│   ├── index.js
│   ├── commands/
│   │   └── forum-rank.js
│   └── utils/
│       ├── discord-api.js
│       ├── message-formatter.js
│       └── report-generator.js
└── README.md
```

## Running Tests

To run unit tests (requires Jest to be installed: `npm install --save-dev jest`):

```bash
npx jest
# Or to run specific tests:
npx jest src/commands/forum-rank.test.js
```
