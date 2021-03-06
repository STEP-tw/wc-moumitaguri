/* eslint-env mocha*/
const assert = require("assert");

const { wc } = require("../src/lib");

const mockFileSystem = function (files) {
  return {
    readFileSync: function (path, encoding) {
      return files[path];
    }
  };
};

describe("wc", function () {
  let files = { numbers: "1\n2\n3\n4", vowels: "a\ne\ni\no\nu" };
  let mockFs = mockFileSystem(files);
  describe("should handle default case", function () {
    it("when single file is given", function () {
      let args = ["numbers"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      assert.deepEqual(actualOut, expectedOut);
    });
    it("when multiple files are given", function () {
      let args = ["numbers", "vowels"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      expectedOut += "\n\t4\t5\t9 vowels";
      expectedOut += "\n\t7\t9\t16 total";
      assert.deepEqual(actualOut, expectedOut);
    });
  });

  describe("should provide line word or byte count according to the given option", function () {
    describe("when single file is given", function () {
      it("should provide line count", function () {
        let args = ["-l", "numbers"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t3 numbers";
        assert.deepEqual(actualOut, expectedOut);
      });

      it("should provide word count", function () {
        let args = ["-w", "numbers"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t4 numbers";
        assert.deepEqual(actualOut, expectedOut);
      });

      it("should provide byte count", function () {
        let args = ["-c", "numbers"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t7 numbers";
        assert.deepEqual(actualOut, expectedOut);
      });
    });
    describe("when multiple files are given", function () {
      it("should provide line count", function () {
        let args = ["-l", "numbers", "vowels"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t3 numbers";
        expectedOut += "\n\t4 vowels";
        expectedOut += "\n\t7 total";
        assert.deepEqual(actualOut, expectedOut);
      });
      it("should provide word count", function () {
        let args = ["-w", "numbers", "vowels"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t4 numbers";
        expectedOut += "\n\t5 vowels";
        expectedOut += "\n\t9 total";
        assert.deepEqual(actualOut, expectedOut);
      });
      it("should provide byte count", function () {
        let args = ["-c", "numbers", "vowels"];
        let actualOut = wc(args, mockFs);
        let expectedOut = "\t7 numbers";
        expectedOut += "\n\t9 vowels";
        expectedOut += "\n\t16 total";
        assert.deepEqual(actualOut, expectedOut);
      });
    });
  });

  describe("when all options given together", function () {
    it("for single file", function () {
      let args = ["-wlc", "numbers"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      assert.deepEqual(actualOut, expectedOut);
    });
    it("for single file", function () {
      let args = ["-wlc", "numbers", "vowels"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      expectedOut += "\n\t4\t5\t9 vowels";
      expectedOut += "\n\t7\t9\t16 total";
      assert.deepEqual(actualOut, expectedOut);
    });
  });

  describe("when all options given separately", function () {
    it("for single file", function () {
      let args = ["-w", "-l", "-c", "numbers"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      assert.deepEqual(actualOut, expectedOut);
    });
    it("for multiple files", function () {
      let args = ["-w", "-l", "-c", "numbers", "vowels"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      expectedOut += "\n\t4\t5\t9 vowels";
      expectedOut += "\n\t7\t9\t16 total";
      assert.deepEqual(actualOut, expectedOut);
    });
  });

  describe("when two options are given separately", function () {
    it("for single file", function () {
      let args = ["-w", "-l", "numbers"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4 numbers";
      assert.deepEqual(actualOut, expectedOut);
    });
    it("for multiple files", function () {
      let args = ["-w", "-l", "numbers", "vowels"];
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4 numbers";
      expectedOut += "\n\t4\t5 vowels";
      expectedOut += "\n\t7\t9 total";
      assert.deepEqual(actualOut, expectedOut);
    });
  });
});
