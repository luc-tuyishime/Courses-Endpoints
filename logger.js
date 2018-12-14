function log(req, res, next) {
  // use next to past to other middleware to terminate the request
  console.log("logging...")
  next()
}

module.exports = log
