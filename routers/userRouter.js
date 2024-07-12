const express = require("express");
const router = express.Router();
const {getUsers} = require("../controller/userController.js");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse.js");

//users page
router.get("/",decorateHtmlResponse("users"),getUsers);

module.exports = router;
