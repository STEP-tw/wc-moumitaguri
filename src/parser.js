const HYPHEN = "-";

const isOption = function (option) {
  return option.startsWith(HYPHEN);
};

const removeHyphen = function (text) {
  return text.replace("-", "");
}

const WC_OPTIONS = ["-l", "-w", "-c"];

const OPTIONS = { "l": "lineCount", "w": "wordCount", "c": "byteCount" };

const isValidOption = function (option) {
  return WC_OPTIONS.includes(option);
};

const createArgsObject = function (files, options) {
  return {
    files: files,
    options: options
  };
};

const isPossibleOption = function (option) {
  return isOption(option) && option.length == 4;
}

const mapOptions = function(options) {
  return options.map((option) => OPTIONS[option]);
}
const parse = function (userArgs) {
  let options = userArgs.filter(isOption);
  let files = userArgs.slice(options.length);
  options = options.map(removeHyphen);
  options = options.join("").split("");
  
  if (options.length == 0) {
    options = ['l', 'w', 'c'];
  }
  return createArgsObject(files, mapOptions(options));
};

module.exports = { parse };
