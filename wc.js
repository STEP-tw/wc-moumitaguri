const { wc } = require("./src/lib.js");
const { parse } = require("./src/parser.js");
const fs = require("fs");

const main = function() {
  const args = process.argv.slice(2);
  console.log(wc(args, fs));
};

main();
