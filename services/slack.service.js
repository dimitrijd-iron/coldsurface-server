/*
    SLACK WEB API
    NPM PACKAGE: "@slack/web-api"
    ENV VARIABLE: passed as token to the constructor
*/

const { WebClient, LogLevel } = require("@slack/web-api");

class SlackService {
  constructor(token) {
    try {
      this.client = new WebClient(token, {});
    } catch (error) {
      console.log(error);
    }
  }

  getChannels = async () => {
    try {
      const result = await this.client.conversations.list();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getMessages = async (channelId) => {
    try {
      const result = await this.client.conversations.history({
        channel: channelId,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  postMessage = async (text, channel = "#general") => {
    try {
      await this.client.chat.postMessage({ channel: channel, text: text });
    } catch (error) {
      console.log(error);
    }
  };
}

// const slack = new SlackService();
// module.exports = slack;

module.exports = SlackService;
