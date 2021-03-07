const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
require("dotenv").config();
require("./db.config");

// slack.getMessages("C01PH1LAT1U").then((data) => console.log(data));

// slack
//   .postMessage("today is Friday after lunch", "#random")
//   .then((data) => console.log(data));

// watson
//   .get("this is another test in the random channel")
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => console.log(err, "we got caught!"));

// watson
//   .get("life is")
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => console.log(err, "we got caught!"));

// watson
//   .get("``test code```")
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => console.log(err, "we got caught!"));

// (async () => {
//   const channels = await Channel.find({}, "_id channelId");
//   const channelTable = Object.fromEntries(
//     new Map(channels.map((el) => [el.channelId, el._id]))
//   );

//   console.log(channels);
//   console.log(channelTable);
// })();

// (async () => {
//   let mongoMessages = await RawData.find({ channel: "C01PTQCJZL7" }, "-_id ts");
//   console.log("mongo messages :", mongoMessages);
// })();

// (async () => {
//   await slack.postMessage(
//     "this is a new message full of hope and fingers crossed that the update will work smile!",
//     "#random",
//     true
//   );
// })();

// console.log(process.env.SLACK);
// const slackWorkSpaces = JSON.parse(process.env.SLACK);
// console.log("slackWorkSpaces", slackWorkSpaces);
// console.log(process.env[slackWorkSpaces[0]]);
