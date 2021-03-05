const { WebClient } = require("@slack/web-api");

const web = new WebClient(process.env.SLACK_TOKEN);
const currentTime = new Date().toTimeString();

async function slackPost(
  text = `Test message @${new Date().toTimeString()}`,
  channel = "#general",
  quiet = false
) {
  try {
    await web.chat.postMessage({
      channel: channel,
      text: text,
    });
  } catch (error) {
    console.log(error);
  }
  if (!quiet)
    console.log(
      ">>> Message posted! >>> ",
      new Date().toTimeString(),
      text.split("").slice(0, 40).join("")
    );
}

module.exports = slackPost;
