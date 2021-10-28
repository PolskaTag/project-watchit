/**
 * verifyJWT is our user authentication method.
 */

require("dotenv").config({ path: "./config.env" });

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // removes 'Bearer` from token
  const token = req.headers["x-access-token"].split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      req.user.email = decoded.email;
    } catch (e) {
      return res
        .status(401)
        .send({ message: "incorrect token given", isLoggedIn: false });
    }
    // console.log(req.user);
    return next();
  } else {
    console.log("token did not exist");
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

module.exports = verifyJWT;
