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
  html:
    "<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don't like oranges.</p></body></html>",
  features: {
    keywords: {
      sentiment: true,
      emotion: true,
      limit: 3,
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
