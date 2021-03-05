const slackpost = require("./slackpost");
const parseCSV = require("./parsecsv");

const channels = ["#channel1", "#channel2", "#channel3"];

function topMessages(data, n = 10) {
  const messageTexts = [];
  for (msg of data.slice(0, n)) messageTexts.push(msg.text);
  console.log("read ", data.length, "messages, printing ", messageTexts.length);
  return messageTexts;
}

randomChannel = () =>
  ["#channel10", "#channel11", "#channel12"][Math.floor(Math.random() * 3)];

function callSlackPost(message, channel = "#general") {
  slackpost(message, channel);
}

// function callSlackPostTest(tag = 0) {
// slackpost(
//   `new posts #${tag} @ ${new Date().toTimeString()}`,
//   randomChannel()
// );
// }

function delayedCallSlackPost(
  message,
  channel = "#general",
  delay = 1000,
  timeStamp = false
) {
  setTimeout(() => {
    callSlackPost(
      message + `${timeStamp ? " @" + new Date().toTimeString() : ""}`,
      channel
    );
  }, delay);
}

function delayedPostArray(data) {
  let i = 0;
  data.forEach((message) => {
    console.log(message);
    delayedCallSlackPost(message, randomChannel(), i++ * 1000, true);
  });
}

parseCSV("./kaggle.csv")
  .then((data) => {
    console.log("records :", data.length);
    const messages = topMessages(data, data.length);
    delayedPostArray(messages);
  })
  .catch((err) => console.log("error: ", error));
