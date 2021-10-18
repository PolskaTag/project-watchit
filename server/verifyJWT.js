require("dotenv").config({ path: "./config.env" });

const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // removes 'Bearer` from token
  console.log("FROM VERIFYJWT");
  // console.log(req.headers["x-access-token"]);

  // console.log(req);
  const token = req.headers["x-access-token"].split(" ")[1];
  // console.log(token);

  if (token) {
    console.log("token exists");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      req.user.email = decoded.email;
      // console.log(req.user.id, req.user.username, req.user.email);
    } catch (e) {
      return res
        .status(401)
        .send({ message: "incorrect token given", isLoggedIn: false });
    }
    console.log(req.user);
    return next();
  } else {
    console.log("token did not exist");
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

module.exports = verifyJWT;
