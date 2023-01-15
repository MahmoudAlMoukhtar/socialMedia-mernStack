const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

const signin = async (req, res) => {
  const {email, password} = req.body;
  try {
    const existingUser = await User.findOne({email: email});
    if (!existingUser)
      return res.status(404).json({message: "sorry this user doesnt exist!"});
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({message: "sorry password or email is error"});

    const token = jwt.sign(
      {
        email: existingUser.email,
        imageProfile: existingUser.imageProfile,
        id: existingUser._id,
      },
      "132jwtsecretkey123",
      {expiresIn: "3d"}
    );
    res.status(200).json({resulte: existingUser, token});
  } catch (err) {
    res.status(400).json({message: "Somthing error in signin"});
  }
};

const signup = async (req, res) => {
  const {fullName, email, password, confirmPassword, imageProfile} = req.body;
  try {
    const existingUser = await User.findOne({email: email});
    if (existingUser)
      return res.status(404).json({message: "sorry this user already exist!"});
    if (password !== confirmPassword)
      return res.status(404).json({message: "Passwords not match"});

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const resulte = new User({fullName, email, imageProfile, password: hash});
    resulte.save();
    const token = jwt.sign(
      {
        fullName: resulte.fullName,
        email: resulte.email,
        imageProfile: resulte.imageProfile,
        id: resulte._id,
      },
      "132jwtsecretkey123",
      {expiresIn: "3d"}
    );
    res.status(200).json({resulte, token});
  } catch (err) {
    res.status(500).json({message: "Somthing error in signin"});
  }
};

const updateProfile = async (req, res) => {
  const {id: _id} = req.params;
  const updates = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post with that id");
  }
  try {
    const updateProfile = await User.findByIdAndUpdate(
      _id,
      {...updates, imageProfile: req.file.originalname},
      {
        new: true,
      }
    );
    const token = jwt.sign(
      {
        fullName: updateProfile.fullName,
        email: updateProfile.email,
        imageProfile: updateProfile.imageProfile,
        id: updateProfile._id,
      },
      "132jwtsecretkey123",
      {expiresIn: "3d"}
    );
    //console.log(updateProfile);
    res.status(200).json({resulte: updateProfile, token});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports = {
  signin,
  signup,
  updateProfile,
};
