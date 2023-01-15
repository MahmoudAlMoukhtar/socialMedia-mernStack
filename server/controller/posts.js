const {default: mongoose} = require("mongoose");
const PostMessage = require("../models/postMessage");

const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find().sort({_id: -1});
    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
};

const getPostById = async (req, res) => {
  const {id: _id} = req.params;
  //console.log(_id);
  try {
    const postMessage = await PostMessage.findById(_id);
    //console.log(postMessage);
    res.status(200).json(postMessage);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  //console.log(req.file);
  //console.log(req.userId);

  const newPost = new PostMessage({
    ...post,
    selectedFile: req.file.originalname,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    comments: [],
  });
  //console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

const updatePost = async (req, res) => {
  const {id: _id} = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post with that id");
  }
  try {
    const updatePost = await PostMessage.findByIdAndUpdate(_id, updates, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

const deletPost = async (req, res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post with that id");
  }
  try {
    await PostMessage.findByIdAndRemove(_id);
    res.status(200).send("success deleted post!");
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

const likePost = async (req, res) => {
  const {id: _id} = req.params;
  // console.log("from likes server", _id);
  // console.log("req.userId", req.userId);
  if (!req.userId) return res.status(400).json({message: "Unauthenticated"});

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(_id);
  //console.log("from likes server post", post);

  const index = post.likes.findIndex(id => id === String(req.userId));
  if (index === -1) {
    //console.log("from likes server");
    post.likes.push(String(req.userId));
  } else {
    //console.log("from likes server");
    post.likes = post.likes.filter(id => id !== String(req.userId));
  }

  const updatedLikesPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatedLikesPost);
};

const commentPost = async (req, res) => {
  const {id: _id} = req.params;
  const {value} = req.body;
  //console.log(value);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(_id);
  post.comments.push(value);
  //console.log("from comments server post", post);

  const updatedLikesPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatedLikesPost);
};

const removeCommentPost = async (req, res) => {
  const {idPost: _id, idComment} = req.params;
  //console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  let post = await PostMessage.findById(_id);
  const index = post.comments.findIndex(comment => comment.id === idComment);
  console.log(index);
  post.comments.splice(index, 1);
  //console.log("from comments server delete", post);
  const updateCommentsPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  //console.log(updateCommentsPost);
  res.status(200).json(updateCommentsPost);
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletPost,
  likePost,
  getPostById,
  commentPost,
  removeCommentPost,
};
