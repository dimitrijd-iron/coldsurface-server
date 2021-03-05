const SlackService = require("./services/slack.service.js");

slack = new SlackService();

slack.getChannels().then((data) => console.log(data));

slack.getMessages("C01QM6Q78KT").then((data) => console.log(data));

slack
  .postMessage("today is Friday", "#random")
  .then((data) => console.log(data));
