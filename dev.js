const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const channel = require("./models/channel.model");

const dataPipeline = async () => {

  // get channel (id, name) list from Slack
  let slackChannels = await slack.getChannels();
  slackChannels = slackChannels.channels.map(({ id, name }) => {
    return { id, name };
  });

  // mongoChannels = await channel.find();

// get channel id list from Mongo
// const slackChannels = await slack.getChannels();

// get the new channels (present in slack but not in mongo)
// TODO: in case of new Channel, write to Mongo

// for each new channel, get slack messages

// get message id list from Mongo

// filter out the messages which are already in mongo

// for each slack message, augmenting with Watson

// for each augmented message record it into



dataPipeline()
  .then()
  .catch((err) => console.log("err - data", err));





  // slack.getMessages("C01QM6Q78KT").then((data) => console.log(data));

// slack
//   .postMessage("today is Friday after lunch", "#random")
//   .then((data) => console.log(data));

// watson
//   .get()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err, "we got caught!"));