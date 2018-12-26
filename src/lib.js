const NEWLINE = "\n";
const SPACE = " ";
const EMPTY_STRING = "";
const TAB = "\t";
const ENCODING = "utf8";

const splitByNewLine = string => string.split(NEWLINE);
const splitBySpace = string => string.split(SPACE);
const splitByEmptyString = string => string.split(EMPTY_STRING);

const getLines = function(content) {
  return splitByNewLine(content);
};

const getBytes = function(content) {
  return splitByEmptyString(content);
};

const getCount = function(content) {
  return content.length;
};

const isNotWord = function(word) {
  return word != EMPTY_STRING;
};

const getWords = function(content) {
  return splitBySpace(content).filter(isNotWord);
};

const sum = (num1, num2) => num1 + num2;

const countWords = function(lines) {
  let words = lines.map(getWords);
  let wordCount = words.map(getCount).reduce(sum, 0);
  return wordCount;
};

const getLineWordByteCount = function(fileContent) {
  const lines = getLines(fileContent);
  const lineCount = getCount(lines);
  const wordCount = countWords(lines);
  const bytes = getBytes(fileContent);
  const byteCount = getCount(bytes);
  return {
    lineCount: lineCount,
    wordCount: wordCount,
    byteCount: byteCount
  };
};

const getWCDetails = function({ lineCount, wordCount, byteCount }) {
  return [lineCount, wordCount, byteCount];
};

const getFileContent = function(file, fs) {
  return fs.readFileSync(file, ENCODING);
};

const wc = function(file, fs) {
  const fileContent = getFileContent(file, fs);
  const lineWordByte = getLineWordByteCount(fileContent);
  const wcDetail = getWCDetails(lineWordByte).join(TAB);
  return wcDetail + " " + file;
};

module.exports = { wc };
