const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
const DF = require("data-forge");
const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const { ImATeapot } = require("http-errors");
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

getRawDataFlat = async () => {
  let data = await RawData.find();
  data = await data.map((el) => {
    return {
      day: el.tsDate.toISOString().slice(0, 10),
      workspace: el.workspace,
      channel: el.channel,
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
  console.log("[coldsurface] Reading raw data from mongodb.");
  const data = await getRawDataFlat();
  console.log(data);
  console.log("[coldsurface] Read raw data from mongodb.");
  let summary = [];

  db.serialize(function () {
    db.run(`CREATE TABLE data (
      day TEXT
      ,workspace TEXT
      ,channel TEXT
      ,joy REAL
      ,sadness REAL
      ,fear REAL
      ,disgust REAL
      ,anger REAL
      ,sentiment REAL
      )`);

    var stmt = db.prepare(
      `INSERT INTO data(day, workspace, channel, joy, sadness, fear, disgust, anger, sentiment) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    for (let i = 0; i < data.length; i++) {
      stmt.run(
        data[i].day,
        data[i].workspace,
        data[i].channel,
        data[i].joy,
        data[i].sadness,
        data[i].fear,
        data[i].disgust,
        data[i].anger,
        data[i].sentiment
      );
    }

    stmt.finalize();

    console.log("[coldsurface] Data load completed. Calculating stats.");

    db.each(
      `SELECT day, workspace, channel, count(*) AS numberOfMessages, 
       AVG(joy) AS joy, AVG(sadness) AS sadness, AVG(fear) AS fear,
       AVG(disgust) AS disgust, AVG(anger) AS anger, AVG(sentiment) AS sentiment
       FROM data
       GROUP BY day, workspace, channel;`,
      function (err, row) {
        console.log(row);
        summary.push(row);
      }
    );
  });

  db.close();
  return summary;
  console.log("[coldsurfce] Statistics completed and inserted into mongodb");
};

transform();
