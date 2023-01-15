const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletPost,
  likePost,
  getPostById,
  commentPost,
  removeCommentPost,
} = require("../controller/posts");
const authMW = require("../middleware/authMW.js");
const multer = require("multer");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/path/to/temporary/directory/to/store/uploaded/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({storage: storage});

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/", authMW, upload.single("image"), createPost);

router.patch("/:id", authMW, updatePost);
router.patch("/:id/likePost", authMW, likePost);
router.post("/:id/commentPost", authMW, commentPost);
router.post("/:idPost/commentPost/:idComment", authMW, removeCommentPost);
router.delete("/:id", authMW, deletPost);

module.exports = router;
