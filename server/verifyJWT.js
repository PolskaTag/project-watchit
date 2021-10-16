require("dotenv").config({ path: "./config.env" });

const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  console.log("FROM VERIFYJWT");
  // console.log(req);
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);

  if (token) {
    console.log("token exists");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      }

      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      req.user.email = decoded.email;
      next();
    });
  } else {
    console.log("token did not exist");
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

module.exports = verifyJWT;
