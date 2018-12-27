const NEWLINE = "\n";
const SPACE = " ";
const EMPTY_STRING = "";
const TAB = "\t";
const ENCODING = "utf8";

const splitByNewLine = string => string.split(NEWLINE);
const splitBySpace = string => string.split(SPACE);
const splitByEmptyString = string => string.split(EMPTY_STRING);

const sum = (num1, num2) => num1 + num2;

module.exports = {
  splitByNewLine,
  splitBySpace,
  splitByEmptyString,
  NEWLINE,
  EMPTY_STRING,
  SPACE,
  TAB,
  ENCODING,
  sum
};
