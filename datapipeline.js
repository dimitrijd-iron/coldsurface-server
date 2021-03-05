const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");

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
  slackChannels = slackChannels.channels.map(({ id, name }) => {
    return { channelId: id, name: name };
  });
  // get channel id list from Mongo
  let mongoChannels = await Channel.find({}, "-_id channelId");
  mongoChannels = mongoChannels.map(({ channelId }) => channelId);
  // calculate delta channels
  const deltaChannels = slackChannels.filter(
    (element) => !mongoChannels.includes(element.channelId)
  );
  // insert delta channels
  await insertChannels(deltaChannels);

  for (chan of slackChannels.map(({ channelId }) => channelId)) {
    // for each existing channel in slack, get channel get the message history (ts, text, user)
    // console.log("===================", chan, "===================");
    let slackMessages = await slack.getMessages(chan);
    slackMessages = slackMessages.messages.map(({ ts, text, user }) => {
      return { ts, text, user };
    });
    // console.log(slackMessages);
    // get message natural key ts from Mongo
    let mongoMessages = await RawData.find({ channelId: chan }, "-_id ts");
    mongoMessages = mongoMessages.map(({ ts }) => ts);
    // console.log("mongo messages ----", mongoMessages);
    // calculate delta messages
    const deltaMessages = slackMessages.filter(
      (element) => !slackMessages.includes(element.ts)
    );
    console.log(
      "vvvvvvvv ------- vvvvv ------ vvvvv DELTA ---------vvvvvvvv-----vvvvvvv"
    );

    const sentiment = await watson.get(deltaMessages[0].text);
    console.log(deltaMessages[0]);
    console.log(JSON.stringify(sentiment));
  }
})();

// for each new channel, get slack messages

// get message id list from Mongo

// filter out the messages which are already in mongo

// for each slack message, augmenting with Watson

// for each augmented message record it into

// slack.getMessages("C01QM6Q78KT").then((data) => console.log(data));

// slack
//   .postMessage("today is Friday after lunch", "#random")
//   .then((data) => console.log(data));

// watson
//   .get()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err, "we got caught!"));
