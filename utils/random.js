const crypto = require("crypto");
const randomString = () => {
  return crypto.randomBytes(20).toString("hex");
};
module.exports = { randomString };
