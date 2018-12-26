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
  describe('should handle default case', function () {
    it("when single file is given", function () {
      let args = { files: ["numbers"] }
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3\t4\t7 numbers";
      assert.deepEqual(actualOut, expectedOut);
    });
  });

  describe('should provide line word or byte count according to the given option when single file is given', function () {
    it('should provide line count', function () {
      let args = { option: 'line', files: ["numbers"] };
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t3 numbers"
      assert.deepEqual(actualOut, expectedOut);
    });

    it('should provide word count', function () {
      let args = { option: 'word', files: ["numbers"] };
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t4 numbers"
      assert.deepEqual(actualOut, expectedOut);
    });

    it('should provide word count', function () {
      let args = { option: 'byte', files: ["numbers"] };
      let actualOut = wc(args, mockFs);
      let expectedOut = "\t7 numbers"
      assert.deepEqual(actualOut, expectedOut);
    });
  });
});
