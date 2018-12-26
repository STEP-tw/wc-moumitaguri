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

const format = function (lineWordByte, file) {
  const wcDetail = getWCDetails(lineWordByte).join(TAB);
  return formatWCResult(wcDetail, file);
}

const getWCDetails = function ({ lineCount, wordCount, byteCount }) {
  return [lineCount, wordCount, byteCount];
};

const getFileContent = function (file, fs) {
  return fs.readFileSync(file, ENCODING);
};


const RunWC = function (parsedArgs, fs) {
  const { files, option } = parsedArgs;
  return files.map(function (file) {
    const fileContent = getFileContent(file, fs);
    let allCounts = getLineWordByteCount(fileContent);
    let counts = allCounts;
    if (option) {
      counts = getCountByOption(allCounts, option);
      return formatWCResult(counts,file).join("");
    }
    return format(counts, file).join("");
  });
};

const wc = function (parsedArgs, fs) {
  return RunWC(parsedArgs, fs).join("\n");
}


module.exports = { wc };
