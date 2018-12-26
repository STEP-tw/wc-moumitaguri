const { wc } = require("./src/lib.js");
const fs = require("fs");

const main = function() {
  const file = process.argv[2];
  const result = wc(file, fs);
  console.log(result);
};

main();