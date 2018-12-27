const { splitByNewLine,
  splitBySpace,
  splitByEmptyString,
  sum,
  NEWLINE,
  SPACE,
  EMPTY_STRING,
  TAB,
  ENCODING }
  = require('./util');

const { getCountByOption, formatWCResult }
  = require('./format');

const getLines = function (content) {
  return splitByNewLine(content);
};

const getBytes = function (content) {
  return splitByEmptyString(content);
};

const getCount = function (content) {
  return content.length;
};

const isNotWord = function (word) {
  return word != EMPTY_STRING;
};

const getWords = function (content) {
  return splitBySpace(content).filter(isNotWord);
};

const countWords = function (lines) {
  let words = lines.map(getWords);
  let wordCount = words.map(getCount).reduce(sum, 0);
  return wordCount;
};

const countLines = function (lines) {
  return getCount(lines) - 1;
}
const countBytes = function (bytes) {
  return getCount(bytes);
}

const getLineWordByteCount = function (fileContent) {
  const lines = getLines(fileContent);
  const bytes = getBytes(fileContent);
  return {
    lineCount: countLines(lines),
    wordCount: countWords(lines),
    byteCount: countBytes(bytes)
  };
};

const format = function (counts, file) {
  const wcDetail = getWCCounts(counts).join(TAB);
  return formatWCResult(wcDetail, file);
}

const getWCCounts = function (counts) {
  return Object.keys(counts).map((x) => counts[x]);
}

const getFileContent = function (file, fs) {
  return fs.readFileSync(file, ENCODING);
};

const mapper = function (fs, option, file) {
  const fileContent = getFileContent(file, fs);
  let counts = getLineWordByteCount(fileContent);
  if (option) {
    counts = getCountByOption(counts, option);
  }
  return format(counts, file).join("");
}

const runWC = function (parsedArgs, fs) {
  const { files, option } = parsedArgs;
  const mapFileWithCounts = mapper.bind(null, fs, option);
  return files.map(mapFileWithCounts);
};

const wc = function (parsedArgs, fs) {
  return runWC(parsedArgs, fs).join("\n");
}


module.exports = { wc };
