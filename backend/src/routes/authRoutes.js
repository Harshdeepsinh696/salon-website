const express = require("express");
const { customerSignup, customerLogin, ownerLogin } = require("../controllers/authController");

const router = express.Router();

router.post("/customer/signup", customerSignup);
router.post("/customer/login", customerLogin);
router.post("/owner/login", ownerLogin);

module.exports = router;
