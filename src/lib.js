const { sum, getBytes, getLines, getWords, getCount } = require("./util");

const { NEWLINE, ENCODING } = require("./constants");

const { parse } = require("./parser");

const { formatter } = require("./format");

const countWords = function(content) {
  let lines = getLines(content);
  let words = lines.map(getWords);
  let wordCount = words.map(getCount).reduce(sum, 0);
  return wordCount;
};

const countLines = function(content) {
  const lines = getLines(content);
  return getCount(lines) - 1;
};

const countBytes = function(content) {
  const bytes = getBytes(content);
  return getCount(bytes);
};

const getFileDetails = function({fileContent, file}) {
  const lineCount = countLines(fileContent);
  const wordCount = countWords(fileContent);
  const byteCount = countBytes(fileContent);
  return { lineCount, wordCount, byteCount, file };
};

const getFiles = function(fs,files) {
  const reader = getFileContent.bind(null,fs);
  return files.map(reader);
};

const getFileContent = function(fs,file) {
  const fileContent = fs.readFileSync(file, ENCODING);
  return { fileContent, file};
};

const addCounts = function(firstFile, secondFile){
  const lineCount = firstFile.lineCount + secondFile.lineCount;
  const wordCount = firstFile.wordCount + secondFile.wordCount;
  const byteCount = firstFile.byteCount + secondFile.byteCount;
  const file = "total";
  return {lineCount, wordCount, byteCount, file};
};

const getTotal = function(fileDetails){
  return fileDetails.reduce(addCounts);
};

const multipleFileFormatter = function(fileDetails){
  if(fileDetails.length > 1){
    const total = getTotal(fileDetails);
    fileDetails.push(total);
  }
  return fileDetails;
};

const wc = function(args, fs) {
  const { options, files}  = parse(args);
  const fileContents = getFiles(fs, files);
  let fileDetails = fileContents.map(getFileDetails);
  fileDetails = multipleFileFormatter(fileDetails);
  const singleFileFormatter = formatter.bind(null,options);
  const result = fileDetails.map(singleFileFormatter);
  return result.join(NEWLINE);
};

module.exports = { wc };
