const HYPHEN = "-";

const isOption = function (option) {
  return option.startsWith(HYPHEN);
}

const WCOptions = ['-l', '-w', '-c'];

const OPTIONS = { '-l' : "line", '-w' : "word", '-c' : "byte" };

const isValidOption = function (option) {
  return WCOptions.includes(option);
}

const createArgsObject = function (files, option) {
  return {
    files: files,
    option: option
  };
}

const parseInput = function (args) {
  const firstArg = args[0];
  let files = args.slice();
  let option = "";
  if (isOption(firstArg)) {
    option = firstArg;
    files = args.slice(1)
  }
  return createArgsObject(files, option);
}

const parse = function(args) {
  let  { files, option } = parseInput(args);
  if(isValidOption(option)){
    option = OPTIONS[option];
  }
  return createArgsObject(files, option);
}

module.exports = { parse };