const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_API_KEY,
  }),
  serviceUrl: process.env.IBM_NLP_ENDPOINT,
});

const analyzeParams = {
  text: `
  "test 123 Tue Mar 2 16:26"
"AAAAA Tue 7:39 test"
"<@U01PQ2XPQ91> has joined the channel"
"into a .env"
"just joined IronHack - it's amazing!!! I love it! :)"
"<https://api.slack.com/apps>"
"<@U01PHDA47JA> has joined the channel"
"<@U01PPQEP70S> hey this is, guess what, another test message!"
"random test message"
"<@U01PPQEP70S> has joined the channel"
`,

  features: {
    emotion: {
      document: true,
    },
    sentiment: {
      document: true,
    },
  },
};

naturalLanguageUnderstanding
  .analyze(analyzeParams)
  .then((analysisResults) => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch((err) => {
    console.log("error:", err);
  });
