const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");

require("./db.config");

(async () => {
  // get channel (id, name) list from Slack
  let slackChannels = await slack.getChannels();
  slackChannels = slackChannels.channels.map(({ id, name }) => {
    return { id, name };
  });
  console.log(slackChannels);

  // // get channel id list from Mongo
  // let mongoChannels = await channel.find();
  // console.log(mongoChannels);

  // write new channels to Mongo
  const newChannels = slackChannels.map(({ id, name }) => {
    return { channelId: id, name: name };
  });
  console.log(newChannels);

  // Channel.insertMany(newChannels)
  //   .then(function () {
  //     console.log("New Channels Inserted"); // Success
  //   })
  //   .catch(function (error) {
  //     console.log(error); // Failure
  //   });
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
