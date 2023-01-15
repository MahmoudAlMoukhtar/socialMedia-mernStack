const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userImage: {
    type: String,
  },
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  creator: {
    type: String,
  },
  // selectedFile: {
  //   type: String,
  // },
  message: {
    type: String,
  },
  tags: {
    type: [String],
  },

  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage;

/* 
  selectedFile: {
    type: String,
  },
*/
