const { WebClient, LogLevel } = require("@slack/web-api");

const client = new WebClient(process.env.SLACK_TOKEN, {
//  logLevel: LogLevel.DEBUG,
});

(async () => {
  try {
    const result = await client.conversations.list();
    console.log(JSON.stringify(result.channels));
  } catch (error) {
    console.log(error);
  }
  console.log("request sent");
})();
