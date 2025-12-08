const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleDateString();
  console.log(time);
  //   const date = time.split("T")[0];
  //   console.log(time);
  //   console.log(date);
  console.log(method, url, time);
  next();
};
module.exports = logger;
