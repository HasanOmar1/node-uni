//  חסן עומר + עיסא לואבנה

// logger middleware to log HTTP method, URL, date, and time
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  console.log(`[${method}]`, url, date, time);
  next();
};

module.exports = logger;
