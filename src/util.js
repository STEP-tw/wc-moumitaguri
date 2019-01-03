const { NEWLINE, SPACE, EMPTY_STRING } = require("./constants");

const splitByNewLine = string => string.split(NEWLINE);
const splitBySpace = string => string.split(SPACE);
const splitByEmptyString = string => string.split(EMPTY_STRING);

const getCount = text => text.length;
const isNotWord = word => word != EMPTY_STRING;
const sum = (num1, num2) => num1 + num2;

const getLines = function(content) {
  return splitByNewLine(content);
};

const getBytes = function(content) {
  return splitByEmptyString(content);
};

const getWords = function(content) {
  return splitBySpace(content).filter(isNotWord);
};

module.exports = {
  splitByNewLine,
  splitBySpace,
  splitByEmptyString,
  sum,
  getLines,
  getBytes,
  getWords,
  getCount
};
