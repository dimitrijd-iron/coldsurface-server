const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
  day: { type: Date, default: Date.now },
  user: String,
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  numberOfMessages: Number,
  emotionAverage: {
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number,
  },
  sentimentScoreAverage: Number,
  rawDataKeys: [{ type: Schema.Types.ObjectId, ref: "RawData" }], // backlog
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;
