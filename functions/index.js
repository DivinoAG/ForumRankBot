const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { InteractionType, InteractionResponseType, verifyKey } = require("discord-interactions");
const { handleForumRank } = require("../src/commands/forum-rank");

exports.interaction = onRequest({ secrets: ["DISCORD_PUBLIC_KEY"] }, (req, res) => {
  const signature = req.get("X-Signature-Ed25519");
  const timestamp = req.get("X-Signature-Timestamp");
  const rawBody = req.rawBody;

  const isValidRequest = verifyKey(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);

  if (!isValidRequest) {
    logger.error("Invalid request signature");
    return res.status(401).send("Bad request signature");
  }

  const interaction = req.body;
  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  } 

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name === "forum-rank") {
        return handleForumRank(interaction).then(() => {
            res.status(200).send();
        }).catch(err => {
            logger.error(err);
            res.status(500).send("Internal Server Error");
        });
    }
  }
  
  return res.status(200).send();
});