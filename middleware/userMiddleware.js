const jwt = require("jsonwebtoken");
const AuthUser = require("../modals/authUser");

const checkIfUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      // login user
      jwt.verify(token, "dev", async (err, decoded) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          const loginUser = await AuthUser.findById(decoded.id);
  
          res.locals.user = loginUser;
          next();
        }
      });
    } else {
      // no login user
      res.locals.user = null;
      next();
    }
  };

module.exports = checkIfUser;