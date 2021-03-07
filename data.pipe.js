const SlackService = require("./services/slack.service");
const watson = require("./services/watson.service");
const { mongo, Mongoose } = require("mongoose");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const Channel = require("./models/channel.model");
const RawData = require("./models/raw.data.model");
const Stats = require("./models/statistic.model");
const mongoose = require("./db.config");

const updateWorkSpace = require("./data.pipe.update.workspace");

ingestData = async () => {
  let response = undefined;
  console.log("[coldsurface] Updating workspaces...");
  const slackWorkSpaces = await JSON.parse(process.env.SLACK);
  console.log(
    `[coldsurface] There are ${
      slackWorkSpaces.length
    } listed slack work spaces: \n[coldsurface] ${JSON.stringify(
      slackWorkSpaces
    )}`
  );
  if (!slackWorkSpaces) {
    console.log("[coldsurface] SLACK env undefined.  Process terminated.");
    return;
  }
  for (workSpace of slackWorkSpaces) {
    let token = await process.env[workSpace];
    let slack;
    if (!token) {
      console.log(
        `[coldsurface] The token for workspace ${workSpace} is undefined. Update skipped.`
      );
      continue;
    }
    console.log(`[coldsurface] Connecting to ${workSpace} workspace.`);
    slack = await new SlackService(token); // always returns an object, even with no token
    response = await slack.getChannels(); // dummy call to test service availability
    if (!response) {
      console.log(
        `[coldsurface] The connection for workspace ${workSpace} is unavailable. Update skipped.`
      );
      continue;
    }
    await updateWorkSpace(slack, workSpace);
  }
};

extractData = async () => {
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

transformAndLoadData = async () => {
  console.log("[coldsurface] Reading raw data from mongodb.");
  const data = await extractData();
  console.log("[coldsurface] Read raw data from mongodb.");
  await mongoose.connection.db.dropCollection("stats", function (err, result) {
    console.log("[coldurface] Prior stats collection dropped.");
  });

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
        // console.log(row);
        try {
          var mute = Stats.create(row);
        } catch (err) {
          console.log("[coldsurface] ", err);
        }
      }
    );
  });

  db.close();
  console.log("[coldsurfce] Data transformation completed.");
  console.log("[coldsurfce] Data loading completed.");
  return;
};

transformAndLoadData();

module.exports = ingestData;
