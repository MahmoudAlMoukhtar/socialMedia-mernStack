const express = require("express");
const {signin, signup, updateProfile} = require("../controller/users");
const User = require("../models/User");
const router = express.Router();
const authMW = require("../middleware/authMw.js");
const multer = require("multer");
const mongoose = require("mongoose");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/path/to/temporary/directory/to/store/uploaded/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({storage: storage});

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/updateProfile/:id", upload.single("imageProfile"), updateProfile);

module.exports = router;
