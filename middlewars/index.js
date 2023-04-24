const insertBodyValidator = require("./insertBodyValidator");
const bodyValidator = require("./bodyValidator");
const isValidId = require("./isValidId");
const updateStatus = require("./updateStatusFavorite");
const authenticate = require("./authenticate");

module.exports = {
  updateStatus,
  insertBodyValidator,
  bodyValidator,
  isValidId,
  authenticate,
};
