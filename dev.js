const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const DF = require("data-forge");
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

(async () => {
  let data = await RawData.find();
  data = data.map((el) => {
    return {
      ...el,
      year: el.tsDate.getFullYear(),
      month: el.tsDate.getMonth() + 1,
      day: el.tsDate.getDate(),
      ISODate: el.tsDate.toISOString().slice(0, 10),
    };
  });
  console.log(data);

  //   let df = new DF.DataFrame([
  //     { ones: 1, tens: 10 },
  //     { ones: 2, tens: 20 },
  //     { ones: 3, tens: 30 },
  //   ]);
  //   console.log(df);

  //   df = new DF.DataFrame(data);
  //   console.log(df);

  //   let objects = df.toArray();
  //   console.log(objects);

  //   const summmarized = df
  //     .orderBy((row) => row.ISODate)
  //     .groupBy((row) => row.ISOdata))
  //     .select((group) => ({
  //       // Aggregate sales per client.
  //       ClientName: group.first().ClientName,
  //       Average: group.select((row) => row.Sales).average(), // Average sales per client.
  //       Total: group.select((row) => row.Sales).sum(), // Sum sales per client.
  //     }));

  //   console.log(df);
})();

// let data = [ /* ... your data ... */ ];
// let df = new dataForge.DataFrame(data);
