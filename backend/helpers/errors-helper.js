function getError(err) {
  // On production return general error message without secured data:
  if (config.isProduction) {
    return "Some error occurred, please try again later.";
  }
  return err.message;
}

module.exports = {
  getError,
};
