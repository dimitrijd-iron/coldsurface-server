const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const DF = require("data-forge");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
require("dotenv").config();
require("./db.config");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

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

// // console.log(data);
// const df = new DF.DataFrame(data);
// const summary = df
//   .groupBy((row) => row.day)
//   .select((group) => ({
//     day: group.first().day,
//     workspace: group.first().workspace,
//     channel: group.first().channel,
//     joy: group
//       .deflate((row) => row.joy)
//       .average()
//       .toFixed(2),
//     sadness: group
//       .deflate((row) => row.sadness)
//       .average()
//       .toFixed(2),
//     fear: group
//       .deflate((row) => row.fear)
//       .average()
//       .toFixed(2),
//     disgust: group
//       .deflate((row) => row.disgust)
//       .average()
//       .toFixed(2),
//     anger: group
//       .deflate((row) => row.anger)
//       .average()
//       .toFixed(2),
//     sentiment: group
//       .deflate((row) => row.sentiment)
//       .average()
//       .toFixed(2),
//   }))
//   .inflate()
//   .toArray();

getRawData = async () => {
  let data = await RawData.find();
  data = await data.map((el) => {
    return {
      day: el.tsDate.toISOString().slice(0, 10),
      workspace: el.workspace,
      channel: el.channel,
      numberOfMessages: 1,
      sadness: el.emotion.sadness,
      joy: el.emotion.joy,
      fear: el.emotion.fear,
      disgust: el.emotion.disgust,
      anger: el.emotion.anger,
      sentiment: el.sentimentScore,
    };
  });
  return data;
};

transform = async () => {
  console.log("here!");
  const data = await getRawData();
  console.log(data);

  db.serialize(function () {
    db.run(`CREATE TABLE data (
      info TEXT
      ,day TEXT
      ,workspace TEXT
      ,channel TEXT
      ,sadness REAL
      ,joy REAL
      ,fear REAL
      ,disgust REAL
      ,anger REAL
      ,sentiment REAL
      )`);

    var stmt = db.prepare("INSERT INTO data VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run(`${data[i]}
        data[i]}`);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM data", function (err, row) {
      console.log(row.id + ": " + row.info);
    });
  });

  db.close();
};

transform();
