const assert = require("assert");
const { parse } = require("../src/parser.js");

describe("parse", function() {
  describe("for single file", function() {
    it("should provide parsed input object when option is given ", function() {
      let args = ["-l", "file1"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1"], option: "line" };
      assert.deepEqual(actualOut, expectedOut);
    });

    it("should provide parsed input object when option is not given ", function() {
      let args = ["file1"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1"], option: "" };
      assert.deepEqual(actualOut, expectedOut);
    });
    it ('when all options are given together' , function() {
      let args = [ "-lcw", "file1"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1"], option: "" };
      assert.deepEqual(actualOut, expectedOut);
    });
    it ('when all options are given separately' , function() {
      let args = [ "-l", "-c", "-w", "file1"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1"], option: "" };
      assert.deepEqual(actualOut, expectedOut);
    });
  });
  describe("for multiple files", function() {
    it("should provide parsed input object when option is not given", function() {
      let args = ["file1", "file2"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1", "file2"], option: "" };
      assert.deepEqual(actualOut, expectedOut);
    });
    it("should provide parsed input object when option is given", function() {
      let args = ["-w", "file1", "file2"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1", "file2"], option: "word" };
      assert.deepEqual(actualOut, expectedOut);
    });
    it ('when all options are given together' , function() {
      let args = [ "-lcw", "file1", "file2"];
      let actualOut = parse(args);
      let expectedOut = { files: ["file1", "file2"], option: "" };
      assert.deepEqual(actualOut, expectedOut);
    });
  });
});
