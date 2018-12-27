const HYPHEN = "-";

const isOption = function (option) {
  return option.startsWith(HYPHEN);
};

const removeHyphen = function (text) {
  return text.replace("-", "");
}

const WC_OPTIONS = ["-l", "-w", "-c"];

const OPTIONS = { "-l": "line", "-w": "word", "-c": "byte" };

const isValidOption = function (option) {
  return WC_OPTIONS.includes(option);
};

const createArgsObject = function (files, option) {
  return {
    files: files,
    option: option
  };
};

const isPossibleOption = function (option) {
  return isOption(option) && option.length == 4;
}

const parse = function (args) {
  let options = args.filter(isOption);
  options = options.map(removeHyphen);
  let fileList = args.slice(options.length);

  const firstArg = args[0];
  let files = args.slice();
  let option = "";
  let possibleOption = options.join("");
  possibleOption = "-" + possibleOption;
  if (isPossibleOption(possibleOption)) {
    return createArgsObject(fileList, option);
  }
  if (isPossibleOption(firstArg)) {
    return createArgsObject(args.slice(1), option);
  }
  if (isOption(firstArg)) {
    option = firstArg;
    files = args.slice(1);
    option = OPTIONS[option];
  }
  return createArgsObject(files, option);
};

module.exports = { parse };
