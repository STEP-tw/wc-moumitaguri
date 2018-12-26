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

const getLineWordByteCount = function (fileContent) {
  const lines = getLines(fileContent);
  const lineCount = getCount(lines) - 1;
  const wordCount = countWords(lines);
  const bytes = getBytes(fileContent);
  const byteCount = getCount(bytes);
  return {
    lineCount: lineCount,
    wordCount: wordCount,
    byteCount: byteCount
  };
};

const getWCDetails = function ({ lineCount, wordCount, byteCount }) {
  return [lineCount, wordCount, byteCount];
};

const getFileContent = function (file, fs) {
  return fs.readFileSync(file, ENCODING);
};

const wc = function (file, fs) {
  const fileContent = getFileContent(file, fs);
  const lineWordByte = getLineWordByteCount(fileContent);
  const wcDetail = getWCDetails(lineWordByte).join(TAB);
  return TAB + wcDetail + SPACE + file;
};

module.exports = { wc };
