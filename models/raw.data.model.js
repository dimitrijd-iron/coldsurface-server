const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rawdataSchema = new Schema({
  messageId: String,
  ts: String,
  tsDate: { type: Date },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
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
