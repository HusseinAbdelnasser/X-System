const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController")
const checkIfUser = require("../middleware/userMiddleware")
const requireAuth = require("../middleware/middleware");
const { check } = require("express-validator");
const multer  = require('multer');
const upload = multer({ storage: multer.diskStorage({}) });
 
          


router.post(
  "/update-profile",
  upload.single("avatar"),
  authController.post_profileIme
);


// GET Requst


router.get("*", checkIfUser);
router.post("*", checkIfUser);

router.get("/signout", authController.get_signout);

router.get("/login", authController.get_login);

router.get("/signup", authController.get_signup);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  authController.post_signup
);

router.post("/login", authController.post_login);

router.get("/", authController.get_welcome);

router.get("/home",requireAuth, userController.user_index_get);

router.get("/edit/:id",requireAuth, userController.user_edit_get);

router.get("/view/:id",requireAuth, userController.user_view_get);

router.post("/search",requireAuth, userController.user_search_post);

// DELETE Request
router.delete("/edit/:id", userController.user_delete);

// PUT Requst
router.put("/edit/:id", userController.user_put);

module.exports = router;