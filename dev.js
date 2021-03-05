const SlackService = require("./services/slack.service.js");
const watson = require("./services/watson.service.js");

slack = new SlackService();

// slack.getChannels().then((data) => console.log(data));

// slack.getMessages("C01QM6Q78KT").then((data) => console.log(data));

// slack
//   .postMessage("today is Friday", "#random")
//   .then((data) => console.log(data));

watson
  .get()
  .then((data) => console.log(data))
  .catch((err) => console.log(err, "we got caught!"));
