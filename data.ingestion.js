const SlackService = require("./services/slack.service");
const updateWorkSpace = require("./data.worker");
require("dotenv").config();

ingestData = async () => {
  let response = undefined;
  console.log("[coldsurface] Updating workspaces...");
  const slackWorkSpaces = await JSON.parse(process.env.SLACK);
  console.log(
    `[coldsurface] There are ${
      slackWorkSpaces.length
    } listed slack work spaces: \n[coldsurface] ${JSON.stringify(
      slackWorkSpaces
    )}`
  );
  if (!slackWorkSpaces) {
    console.log("[coldsurface] SLACK env undefined.  Process terminated.");
    return;
  }
  for (workSpace of slackWorkSpaces) {
    let token = await process.env[workSpace];
    let slack;
    if (!token) {
      console.log(
        `[coldsurface] The token for workspace ${workSpace} is undefined. Update skipped.`
      );
      continue;
    }
    console.log(`[coldsurface] Connecting to ${workSpace} workspace.`);
    slack = await new SlackService(token); // always returns an object, even with no token
    response = await slack.getChannels(); // dummy call to test service availability
    if (!response) {
      console.log(
        `[coldsurface] The connection for workspace ${workSpace} is unavailable. Update skipped.`
      );
      continue;
    }
    await updateWorkSpace(slack, workSpace);
  }
};

module.exports = ingestData;
