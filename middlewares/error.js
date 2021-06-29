const errorHandler = (err, req, res, next) => {
  // if (res.headersSent) {
  //   return next(err);
  // }
  res.status(500).send("Something broke!");
  console.error(err.stack);
};

module.exports = errorHandler;