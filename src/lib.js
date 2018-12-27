const { sum,
  getBytes,
  getLines,
  getWords,
  getCount
} = require("./util");

const { NEWLINE,
  SPACE,
  EMPTY_STRING,
  TAB,
  ENCODING }
  = require('./constants');

const { getCountByOption, formatWCResult } = require("./format");

const countWords = function (content) {
  let lines = getLines(content);
  let words = lines.map(getWords);
  let wordCount = words.map(getCount).reduce(sum, 0);
  return wordCount;
};

const countLines = function (content) {
  const lines = getLines(content);
  return getCount(lines) - 1;
};

const countBytes = function (content) {
  const bytes = getBytes(content);
  return getCount(bytes);
};

const getLineWordByteCount = function (content) {
  return {
    lineCount: countLines(content),
    wordCount: countWords(content),
    byteCount: countBytes(content)
  };
};

const format = function (counts, file) {
  const wcDetail = getWCCounts(counts).join(TAB);
  return formatWCResult(wcDetail, file);
};

const formatForMultipleFiles = function (counts, files, totalCounts) {
  let formattedWCResult = "";
  for (index in files) {
    formattedWCResult += format(counts[index], files[index]) + "\n";
  }
  formattedWCResult += format(totalCounts, "total");
  return formattedWCResult;
};

const getWCCounts = function (counts) {
  return Object.keys(counts).map(x => counts[x]);
};

const getFileContent = function (file, fs) {
  return fs.readFileSync(file, ENCODING);
};

const mapper = function (fs, option, file) {
  const fileContent = getFileContent(file, fs);
  let counts = getLineWordByteCount(fileContent);
  if (option) {
    counts = getCountByOption(counts, option);
  }
  return counts;
};

const findTotal = function (countList1, countList2) {
  let keys = Object.keys(countList1);
  let totalCounts = {};
  for (key of keys) {
    totalCounts[key] = countList1[key] + countList2[key];
  }
  return totalCounts;
};

const wc = function (parsedArgs, fs) {
  const { files, option } = parsedArgs;
  const mapFileWithCounts = mapper.bind(null, fs, option);
  let counts = files.map(mapFileWithCounts);
  if (files.length === 1) {
    return format(counts[0], files[0]);
  }
  if (files.length > 1) {
    let totalCounts = counts.reduce(findTotal);
    return formatForMultipleFiles(counts, files, totalCounts);
  }
};
module.exports = { wc };
