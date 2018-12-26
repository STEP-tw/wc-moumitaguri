const assert = require("assert");

const { wc } = require("../src/lib");

const mockFileSystem = function(files) {
  return {
    readFileSync: function(path, encoding) {
      return files[path];
    }
  };
};

describe("wc", function() {
  it("should provide line word byte counts and file name when single file is given", function() {
    let files = { numbers: "1\n2\n3\n4" };
    let mockFs = mockFileSystem(files);
    let actualOut = wc("numbers", mockFs);
    let expectedOut = "\t3\t4\t7 numbers";
    assert.deepEqual(actualOut, expectedOut);
  });
});
