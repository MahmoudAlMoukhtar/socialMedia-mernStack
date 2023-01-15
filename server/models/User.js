const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  imageProfile: {
    type: String,
    default:
      "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  },
  fullName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  id: {type: String},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
