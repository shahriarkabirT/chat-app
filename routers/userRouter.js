const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controller/userController.js");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse.js");
const avatarUpload = require("../middlewares/avatarUpload.js");
const {addUserValidator, addUserValidatorHandler} = require("../middlewares/userValidator.js");

//users page
router.get("/", decorateHtmlResponse("users"), getUsers);

//add user
router.post("/",
    avatarUpload,
    addUserValidator,
    addUserValidatorHandler,
    addUser
);

module.exports = router;
