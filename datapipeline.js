const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const { mongo } = require("mongoose");

require("./db.config");

// helper function: insert new channels obtained from slack into mongo
insertChannels = async (newChannels) => {
  Channel.insertMany(newChannels)
    .then(function () {
      console.log("New Channels Inserted: ", newChannels.length); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

// helper function: insert new raw data from slack and watson into mongo
insertRawData = async (rawdata) => {
  RawData.insertMany(rawdata)
    .then(function () {
      console.log("New Raw Data Inserted: ", rawdata.length); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

(async () => {
  // get channel (id, name) list from Slack
  let slackChannels = await slack.getChannels();
  slackChannels = await slackChannels.channels.map(({ id, name }) => {
    return { channelId: id, name: name };
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
    console.log("=====================", chan, "=====================");
    let slackMessages = await slack.getMessages(chan);
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
    console.log(deltaMessages.length, " new messages in channel ", chan);

    console.log("vvvv ---- vvvvv ----vvvv DELTA vvvv ---- vvvvv ----vvvv ");

    // enriching raw data with Watson, standard time stamp and internal keys??
    for (ndx in deltaMessages) {
      deltaMessages[ndx].channel = chan;
      deltaMessages[ndx].tsDate = new Date(deltaMessages[ndx].ts * 1000);
      const nlpResults = await watson.get(deltaMessages[ndx].text);
      nlpResults.sentiment
        ? (deltaMessages[ndx].sentimentScore =
            nlpResults.sentiment.document.score)
        : (deltaMessages[ndx].sentimentScore = NaN);
      nlpResults.emotion
        ? (deltaMessages[ndx].emotion = {
            ...nlpResults.emotion.document.emotion,
          })
        : (deltaMessages[ndx].emotion = NaN);
      console.log(ndx, "--", chan, deltaMessages[ndx]);
    }

    // inserting incremental raw data
    await insertRawData(deltaMessages);
    // console.log(chan, deltaMessages.length, " new messages.");
  }
  console.log("---------- completed, mongo connection left open");
})();
