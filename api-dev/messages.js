const { WebClient, LogLevel } = require("@slack/web-api");

const client = new WebClient(process.env.SLACK_TOKEN, {
//  logLevel: LogLevel.DEBUG,
});
let conversationHistory;
let channelId = "C01PH1LAT1U";

(async () => {
  try {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
      channel: channelId,
    });

    conversationHistory = result.messages;

    // Print results
//    console.log(conversationHistory.length + " messages found in " + channelId);
    console.log(JSON.stringify(conversationHistory));
  } catch (error) {
    console.error(error);
  }
})();
