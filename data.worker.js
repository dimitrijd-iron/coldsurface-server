const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const { mongo } = require("mongoose");

require("./db.config");

// students only channel: C01DA1X86E7

// helper function: insert new channels obtained from slack into mongo
insertChannels = async (newChannels) => {
  await Channel.insertMany(newChannels)
    .then(function () {
      console.log(`[coldsurface] New channels Inserted: `, newChannels.length); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

// helper function: insert new raw data from slack and watson into mongo
insertRawData = async (rawdata) => {
  await RawData.insertMany(rawdata)
    .then(function () {
      console.log(`[coldsurface] New raw data inserted: `, rawdata.length); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

updateWorkSpace = async (slack, workSpaceName = "workspace") => {
  // get channel (id, name) list from Slack
  let slackChannels = await slack.getChannels();
  slackChannels = await slackChannels.channels.map(({ id, name }) => {
    return { workspace: workSpaceName, channelId: id, name: name };
  });
  // get channel id list from Mongo
  let mongoChannels = await Channel.find({}, "-_id channelId");
  mongoChannels = await mongoChannels.map(({ channelId }) => channelId);
  // calculate delta channels
  const deltaChannels = await slackChannels.filter(
    (element) => !mongoChannels.includes(element.channelId)
  );

  // insert delta channels
  await insertChannels(deltaChannels);

  for (chan of slackChannels.map(({ channelId }) => channelId)) {
    // for each existing channel in slack, get the message history (ts, text, user)
    let slackMessages = await slack.getMessages(chan);
    if (!slackMessages) {
      console.log(
        `[coldsurface] channel ${chan} not available to app. Skipping update.`
      );
      continue;
    }
    slackMessages = slackMessages.messages.map(({ ts, text, user }) => {
      return { ts, text, user };
    });
    // get message natural keys ts from Mongo
    let mongoMessages = await RawData.find({ channel: chan }, "-_id ts");
    mongoMessages = mongoMessages.map(({ ts }) => ts);
    // calculate delta messages
    const deltaMessages = await slackMessages.filter(
      (element) => !mongoMessages.includes(element.ts)
    );
    console.log(
      `[coldsurface] ${deltaMessages.length} new messages in channel ${chan}`
    );

    // enriching raw data with Watson, standard time stamp and internal keys??
    for (ndx in deltaMessages) {
      deltaMessages[ndx].workspace = workSpaceName;
      deltaMessages[ndx].channel = chan;
      deltaMessages[ndx].tsDate = new Date(deltaMessages[ndx].ts * 1000);
      const nlpResults = await watson.get(deltaMessages[ndx].text);
      nlpResults.sentiment
        ? (deltaMessages[ndx].sentimentScore =
            nlpResults.sentiment.document.score)
        : (deltaMessages[ndx].sentimentScore = undefined);
      nlpResults.emotion
        ? (deltaMessages[ndx].emotion = {
            ...nlpResults.emotion.document.emotion,
          })
        : (deltaMessages[ndx].emotion = undefined);
      console.log(
        "[coldsurface] message#",
        ndx,
        "--",
        chan,
        deltaMessages[ndx]
      );
    }

    // inserting incremental raw data
    await insertRawData(deltaMessages);
  }
  console.log(`[coldsurface] Workspace completed.`);
};

module.exports = updateWorkSpace;
