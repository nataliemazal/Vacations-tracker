const crypto = require("crypto");



function hash(plainText) {
  if (!plainText) return null;

  const salt = "MakeThigsRight";
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
  hash,
};
