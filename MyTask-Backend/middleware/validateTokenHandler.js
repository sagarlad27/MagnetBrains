const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized. Invalid token.");
      }

      // Add this line to debug what is decoded
      console.log("Decoded Token: ", decoded);

      // Ensure req.user is set
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized user. Token is missing.");
  }
});

module.exports = validateToken;
