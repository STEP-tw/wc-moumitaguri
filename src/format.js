const { TAB, SPACE }
 = require('./util');

const formatWCResult = function (result, file) {
  return [TAB, result, SPACE, file];
}

const getCountByOption = function (lineWordByte, option) {
  const { lineCount, wordCount, byteCount } = lineWordByte;
  const operation = {
    'line': lineCount,
    'word': wordCount,
    'byte': byteCount
  };
  return {'count' : operation[option] };
}

module.exports = { getCountByOption, formatWCResult };