const slack = require("./services/slack.service");
const watson = require("./services/watson.service");

// slack.getChannels().then((data) => console.log(data));

// slack.getMessages("C01QM6Q78KT").then((data) => console.log(data));

slack
  .postMessage("today is Friday after lunch", "#random")
  .then((data) => console.log(data));

watson
  .get()
  .then((data) => console.log(data))
  .catch((err) => console.log(err, "we got caught!"));
