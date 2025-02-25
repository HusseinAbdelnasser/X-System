const jwt = require("jsonwebtoken");


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  console.log(token)

  if (token) {
    jwt.verify(token, "dev", (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};




module.exports = requireAuth;
