const csv = require("csv-parser");
const { parse } = require("fast-csv");
const fs = require("fs");

function parseCSV(fileURL) {
  const arr = [];
  const pr = new Promise((resolve, reject) => {
    fs.createReadStream(fileURL)
      .pipe(csv())
      .on("data", (row) => {
        arr.push(row);
      })
      .on("end", () => {
        resolve(arr);
      })
      .on("error", (err) => reject(err));
  });
  return pr;
}

parseCSV("kaggle.csv")
  .then((arr) => console.log("arr ----->", arr))
  .catch((err) => console.log(err));

module.exports = parseCSV;
