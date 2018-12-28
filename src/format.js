const { TAB, SPACE } = require("./constants");

const formatWCResult = function(result, file) {
  return [TAB, result, SPACE, file].join("");
};


module.exports = { formatWCResult };
