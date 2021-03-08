const ingestData = require("./data.ingestion");
const transformAndLoadData = require("./data.etl");

dataPipeline = async () => {
  try {
    console.log("[coldsurface] Data ingestion.");
    await ingestData();
    console.log("[coldsurface] ETL.");
    await transformAndLoadData();
    console.log("[coldsurface] Pipeline updated.");
  } catch (err) {
    console.log("[coldsurface] Pipeline update error: ", err);
  }
};

module.exports = dataPipeline;

dataPipeline();
