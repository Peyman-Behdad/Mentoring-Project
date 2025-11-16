const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next(); // حتماً باید next فراخوانی شه تا درخواست ادامه پیدا کنه
};

module.exports = logger;
