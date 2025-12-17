//  חסן עומר + עיסא לואבנה
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  console.log(`[${method}]`, url, date, time);
  next();
};

module.exports = logger;
