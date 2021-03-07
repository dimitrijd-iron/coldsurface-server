require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(5);

const Channel = require("../models/channel.model");
const RawData = require("../models/raw.data.model");
const User = require("../models/service.user.model");
const Stats = require("../models/statistic.model");

const channels = [
  {
    workspace: "KAGGLE",
    channelId: "C01PH1LAT1U",
    name: "random",
  },
  {
    workspace: "KAGGLE",
    channelId: "C01PQ10RD51",
    name: "general",
  },
];

const messages = [
  {
    ts: "1614955443.000100",
    tsDate: new Date(1614955443.0001 * 1000),
    workspace: "KAGGLE",
    channel: undefined,
    text: "today is Friday after lunch",
    user: "U01PPQEP70S",
    emotion: {
      sadness: 0.097104,
      joy: 0.719168,
      fear: 0.126731,
      disgust: 0.024948,
      anger: 0.035484,
    },
    sentimentScore: 0,
  },
  {
    ts: "1614888166.000300",
    tsDate: new Date(1614888166.0003 * 1000),
    workspace: "KAGGLE",
    channel: undefined,
    text: "this is another test in the random channel",
    user: "U01PPQEP70S",
    emotion: {
      sadness: 0.352153,
      joy: 0.083618,
      fear: 0.127476,
      disgust: 0.057412,
      anger: 0.18857,
    },
    sentimentScore: 0,
  },
];

messages[0].tsDate.setHours(0);
messages[0].tsDate.setMinutes(0, 0, 0);
messages[1].tsDate.setHours(0);
messages[1].tsDate.setMinutes(0, 0, 0);

const stats = [
  {
    day: "2021-03-02",
    workspace: "ih-bcn-web-jan2021",
    channel: "#random",
    numberOfMessages: 10,
    emotionAverage: {
      sadness: 0.31233,
      joy: 0.91233,
      fear: 0.61233,
      disgust: 0.41233,
      anger: 0.31233,
    },
    sentimentScoreAverage: 0.9,
  },
  {
    day: "2021-03-02",
    workspace: "ih-bcn-web-jan2021",
    channel: "#random",
    numberOfMessages: 3,
    emotionAverage: {
      sadness: 0.01233,
      joy: 0.01233,
      fear: 0.61233,
      disgust: 0.01233,
      anger: 0.01233,
    },
    sentimentScoreAverage: 0.2,
  },
  {
    day: "2021-03-03",
    workspace: "ih-bcn-web-jan2021",
    channel: "#random",
    numberOfMessages: 2,
    emotionAverage: {
      sadness: 0.91233,
      joy: 0.00233,
      fear: 0.00233,
      disgust: 0.00233,
      anger: 0.00233,
    },
    sentimentScoreAverage: -0.6,
  },
  {
    day: "2021-03-02",
    workspace: "ih-bcn-web-oct2020",
    channel: "#general",
    numberOfMessages: 10,
    emotionAverage: {
      sadness: 0.31233,
      joy: 0.91233,
      fear: 0.61233,
      disgust: 0.41233,
      anger: 0.31233,
    },
    sentimentScoreAverage: 0.9,
  },
  {
    day: "2021-03-02",
    workspace: "ih-bcn-web-oct2020",
    channel: "#general",
    numberOfMessages: 3,
    emotionAverage: {
      sadness: 0.01233,
      joy: 0.01233,
      fear: 0.61233,
      disgust: 0.01233,
      anger: 0.01233,
    },
    sentimentScoreAverage: 0.2,
  },
  {
    day: "2021-03-03",
    workspace: "ih-bcn-web-oct2020",
    channel: "#general",
    numberOfMessages: 2,
    emotionAverage: {
      sadness: 0.91233,
      joy: 0.00233,
      fear: 0.00233,
      disgust: 0.00233,
      anger: 0.00233,
    },
    sentimentScoreAverage: -0.6,
  },
];

const users = [
  {
    name: "John",
    surname: "Foster",
    username: "jfoster@coldsurface.io",
    password: bcrypt.hashSync("iron123!", salt),
    created_at: undefined,
    updated_at: undefined,
  },
  {
    name: "Marcie",
    surname: "Redwood",
    username: "mredwood@coldsurface.io",
    password: bcrypt.hashSync("iron123!", salt),
    created_at: undefined,
    updated_at: undefined,
  },
];

const seedDB = async () => {
  try {
    let conn = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await conn.connection.db.dropDatabase();

    const channelList = await Channel.create(channels);
    console.log("created channelList");

    // messages[0].channel = channelList[0]._id;
    // messages[1].channel = channelList[0]._id;
    messages[0].channel = "C01PH1LAT1U";
    messages[1].channel = "C01PH1LAT1U";

    const messageList = await RawData.create(messages);
    console.log("created messageList");

    const userList = await User.create(users);
    console.log("created userList");

    const statsList = await Stats.create(stats);
    console.log("created statsList");

    await mongoose.connection.close();

    console.log("seeding completed");
  } catch (err) {
    console.log(err);
  }
};

console.log("connecting to :", process.env.MONGODB_URI);
seedDB();
