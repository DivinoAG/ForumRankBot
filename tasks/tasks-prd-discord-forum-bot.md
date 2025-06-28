## Relevant Files

- `README.md` - Project documentation, setup, and deployment instructions.
- `src/index.js` - Main bot entry point, handles Discord client initialization and event listeners.
- `src/commands/top-posts.js` - Defines the `/top-posts` slash command and its execution logic.
- `src/utils/discord-api.js` - Utility functions for interacting with the Discord API (e.g., fetching threads, messages, reactions).
- `src/utils/report-generator.js` - Handles the logic for formatting the report output.
- `src/utils/message-formatter.js` - Utility for handling Discord message size limits and formatting (standard vs. embed).
- `config.js` or `.env` - Configuration for bot token, guild ID, and other environment variables.
- `package.json` - Project dependencies and scripts.
- `src/commands/top-posts.test.js` - Unit tests for the `/top-posts` command logic.
- `src/utils/discord-api.test.js` - Unit tests for Discord API utility functions.
- `src/utils/report-generator.test.js` - Unit tests for report generation logic.
- `src/utils/message-formatter.test.js` - Unit tests for message formatting logic.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Project Setup and Dependencies
  - [x] 1.1 Initialize a new Node.js project with `npm init -y`.
  - [x] 1.2 Install necessary Discord.js library and other dependencies (`npm install discord.js dotenv`).
  - [x] 1.3 Set up `.env` file for Discord bot token and client ID.
  - [x] 1.4 Configure `package.json` for development scripts (e.g., `start`, `dev`).
  - [x] 1.5 Set up a basic project structure (e.g., `src/`, `src/commands/`, `src/utils/`).
- [x] 2.0 Discord Bot Command Handling
  - [x] 2.1 Implement Discord client initialization and login.
  - [x] 2.2 Register the `/top-posts` slash command with Discord API, including `channel`, `number_of_posts`, and `direct_message` parameters.
  - [x] 2.3 Implement command interaction listener to handle `/top-posts` command execution.
  - [x] 2.4 Implement logic to restrict command usage to server moderators.
- [x] 3.0 Forum Thread Data Retrieval and Processing
  - [x] 3.1 Develop a utility function to fetch all threads from a given forum channel ID.
  - [x] 3.2 For each thread, fetch its initial message to access reactions.
  - [x] 3.3 Identify and count only the primary reaction (default emoji) on the initial message.
  - [x] 3.4 Extract thread name and associated tags.
  - [x] 3.5 Sort threads by primary reaction count in descending order.
  - [x] 3.6 Implement logic to limit the number of results based on the `number_of_posts` parameter.
- [x] 4.0 Report Generation and Output
  - [x] 4.1 Develop a function to format the processed thread data into a readable report string.
  - [x] 4.2 Implement logic to check report string length against Discord message limits.
  - [x] 4.3 If the report exceeds limits, format it as an embedded message.
  - [x] 4.4 Implement logic to send the report to the originating channel or as a DM based on the `direct_message` parameter.
- [x] 5.0 Deployment and Configuration
  - [x] 5.1 Prepare the project for Vercel deployment (e.g., `vercel.json` if needed, ensuring environment variables are configured on Vercel).
  - [x] 5.2 Document deployment steps for Vercel.
  - [x] 5.3 Add error handling and logging for production environment.
  - [x] 5.4 Implement basic unit tests for core functionalities (e.g., reaction counting, report formatting, command parsing).
- [x] 6.0 Documentation
  - [x] 6.1 Create `README.md` file.
  - [x] 6.2 Add detailed instructions for project setup (dependencies, environment variables).
  - [x] 6.3 Include steps for creating a Discord bot application and obtaining necessary tokens/IDs.
  - [x] 6.4 Provide comprehensive deployment instructions for Vercel.
  - [x] 6.5 Maintain and update `README.md` as the project evolves.