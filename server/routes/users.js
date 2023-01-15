const express = require("express");
const {signin, signup, updateProfile} = require("../controller/users");
const router = express.Router();
const multer = require("multer");

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
