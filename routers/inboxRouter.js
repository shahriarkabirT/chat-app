const express = require("express");
const router = express.Router();
const {getInbox} = require("../controller/inboxController.js");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse.js");

//login page
router.get("/",decorateHtmlResponse("inbox"),getInbox);

module.exports = router;
