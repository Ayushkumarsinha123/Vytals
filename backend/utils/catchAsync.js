// For catching Async errors
module.exports = (fn) => {
  // Ultimately this is the function which is called by express, so we will have
  // access to (req, res, next) here!
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
