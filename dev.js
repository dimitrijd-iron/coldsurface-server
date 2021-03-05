const slack = require("./services/slack.service");
const watson = require("./services/watson.service");
require("dotenv").config();

// slack.getMessages("C01PH1LAT1U").then((data) => console.log(data));

// slack
//   .postMessage("today is Friday after lunch", "#random")
//   .then((data) => console.log(data));

// watson
//   .get("this is another test in the random channel")
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => console.log(err, "we got caught!"));

tsDate = new Date(1614955443.0001 * 1000);
tsDate = tsDate.setHours(0);
tsDate = tsDate.setMinutes(0, 0, 0);
console.log(tsDate);
