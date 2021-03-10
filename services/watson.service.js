/*
    WATSON API FOR NATURAL LANGUAGE UNDERSTANDING V1
    NPM PACKAGE: "ibm-watson"
    ENV VARIABLES:
        IBM_API_KEY
        IBM_NLP_ENDPOINT
*/
require("dotenv").config();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

class WatsonService {
  constructor() {
    try {
      this.client = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
          apikey: process.env.IBM_API_KEY,
        }),
        serviceUrl: process.env.IBM_NLP_ENDPOINT,
      });
    } catch (error) {
      console.log(error);
    }
  }

  get = async (text = "life is beautiful!") => {
    const analyzeParams = {
      text: text,
      features: { emotion: { document: true }, sentiment: { document: true } },
    };
    return this.client
      .analyze(analyzeParams)
      .then((analysisResults) => {
        return analysisResults.result;
      })
      .catch((err) => {
        console.log(
          "[cold surface] Message too short. Set sentiment, emotion to undefined.",
          err.body
        );
        return {
          sentiment: { document: { score: undefined, label: undefined } },
          language: undefined,
          emotion: {
            document: {
              emotion: {
                sadness: undefined,
                joy: undefined,
                fear: undefined,
                disgust: undefined,
                anger: undefined,
              },
            },
          },
        };
      });
  };
}

const watson = new WatsonService();

module.exports = watson;
