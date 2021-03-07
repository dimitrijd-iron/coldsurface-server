const SlackService = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const updateWorkSpace = require("./data.pipe.update.workspace");
const { mongo } = require("mongoose");
require("./db.config");

updateDataPipe = async () => {
  console.log("[coldsurface] Updating all workspaces...");
  const slackWorkSpaces = JSON.parse(process.env.SLACK);
  for (sws of slackWorkSpaces) {
    let token = process.env[sws];
    let slack;
    if (!token) {
      console.log(
        `  [coldsurface] Token for workspace ${sws} is undefined. Updating skipped.`
      );
      continue;
    }
    console.log(`  [coldsurface] Connecting to ${sws} workspace.`);
    slack = new SlackService(token);
    updateWorkSpace(slack);
  }

  //   console.log("slackWorkSpaces", slackWorkSpaces);

  //   console.log(process.env[slackWorkSpaces[0]]);

  // updateWorkSpace();
};

updateDataPipe();

module.exports = updateDataPipe;
