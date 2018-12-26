const assert = require('assert');
const { parse } = require("../src/parser.js")

describe ('parse' , function() {
  it ('should parse option and file and return an object' , function() {
    let args = [ "-l", "file1"];
    let actualOut = parse(args);
    let expectedOut = { option : "-l", file : "file1"};
    assert.deepEqual(actualOut, expectedOut);
  });
});