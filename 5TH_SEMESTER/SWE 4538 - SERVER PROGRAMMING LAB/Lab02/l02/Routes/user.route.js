const express = require("express");
const {
  postUserInfo,
  postUserInterest,
} = require("../Controllers/user.controller"); //need to import every route
const isAuthenticated = require("../middleware/user.middleware");
const router = express.Router();

router.post("/user", postUserInfo);
router.post("/user/interest", isAuthenticated, postUserInterest);

module.exports = router;
