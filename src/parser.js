const HYPHEN = "-";

const isOption = function (option) {
  return option.startsWith(HYPHEN);
}

const OPTIONS = ['-l', '-w', '-c'];

const isValidOption = function (option) {
  return OPTIONS.includes(option);
}

const createArgsObject = function (file, option) {
  return {
    file: file,
    option: option
  };
}

const parse = function (args) {
  const firstArg = args[0];
  const secondArg = args[1];
  let file = firstArg;
  let option;
  if (isOption(firstArg)) {
    option = firstArg;
    file = secondArg;
  }
  return createArgsObject(file, option);
}


module.exports = { parse };