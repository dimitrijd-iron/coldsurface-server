const SlackService = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const updateWorkSpace = require("./data.pipe.update.workspace");
const { mongo } = require("mongoose");
require("./db.config");

updateDataPipe = async () => {
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
  for (sws of slackWorkSpaces) {
    let token = await process.env[sws];
    let slack;
    if (!token) {
      console.log(
        `[coldsurface] The token for workspace ${sws} is undefined. Update skipped.`
      );
      continue;
    }
    console.log(`[coldsurface] Connecting to ${sws} workspace.`);
    slack = await new SlackService(token);
    response = await slack.getChannels();
    if (!response) {
      console.log(
        `[coldsurface] The connection for workspace ${sws} is unavailable. Update skipped.`
      );
      continue;
    }
    await updateWorkSpace(slack);
  }
};

updateDataPipe();

module.exports = updateDataPipe;
