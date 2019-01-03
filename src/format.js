const { TAB, SPACE, EMPTY_STRING } = require("./constants");
const formatter = function(options, fileDetails){
  const sortedOptions = sortOptions(options);
  const counts = sortedOptions.map(option => {
    return TAB + fileDetails[option];
  });
  
  return counts.join(EMPTY_STRING) + SPACE + fileDetails.file;
};

const sortOptions = function(options) {
  const sortedOptions = ["lineCount", "wordCount", "byteCount"];
  return sortedOptions.filter(option => options.includes(option));
};


module.exports = { formatter };
