const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rawdataSchema = new Schema({
  ts: String,
  tsDate: { type: Date },
  workspace: String,
  channel: String,
  text: String,
  user: String,
  emotion: {
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number,
  },
  sentimentScore: Number,
});

const RawData = mongoose.model("RawData", rawdataSchema);

module.exports = RawData;
