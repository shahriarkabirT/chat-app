const express = require("express");
const router = express.Router();
const {getLogin} = require("../controller/loginController.js");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse.js");

//login page
router.get("/",decorateHtmlResponse("login"),getLogin);

module.exports = router;
