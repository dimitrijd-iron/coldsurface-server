const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  channelId: String,
  name: String,
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
