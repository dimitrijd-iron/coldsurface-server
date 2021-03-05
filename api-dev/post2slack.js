const { WebClient } = require("@slack/web-api");

const web = new WebClient(process.env.SLACK_TOKEN);
const currentTime = new Date().toTimeString();

(async () => {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: "#general",
      text: `Test message @${currentTime}`,
    });
  } catch (error) {
    console.log(error);
  }

  console.log("Message posted!");
})();
