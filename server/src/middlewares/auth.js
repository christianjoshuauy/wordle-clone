const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Null token" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET_FORMULA, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
