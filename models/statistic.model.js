const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  day: String, // { type: Date, default: Date.now },
  workspace: String,
  channel: String,
  numberOfMessages: Number,
  sadness: Number,
  joy: Number,
  fear: Number,
  disgust: Number,
  anger: Number,
  sentiment: Number,
  // rawDataKeys: [{ type: Schema.Types.ObjectId, ref: "RawData" }], // backlog
});

const Stats = mongoose.model("Stat", statsSchema);

module.exports = Stats;
