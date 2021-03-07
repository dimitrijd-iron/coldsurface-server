const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  day: { type: Date, default: Date.now },
  workplace: String,
  channel: String,
  numberOfMessages: Number,
  emotionAverage: {
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number,
  },
  sentimentScoreAverage: Number,
  // rawDataKeys: [{ type: Schema.Types.ObjectId, ref: "RawData" }], // backlog
});

const Stats = mongoose.model("Stat", statsSchema);

module.exports = Stats;
