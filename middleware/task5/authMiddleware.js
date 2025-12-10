//authMiddleware.js
const auth = (req, res, next) => {
  if (currentUser === null) {
    res.status(401).json({ message: "User is not authorized" });
  }
  next();
};
module.exports = auth;
