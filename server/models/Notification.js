const mongoose = require("mongoose");

const notificationShema = mongoose.Schema({
  id: String,
  creator: String,
  text: String,
  url: String,
  image: {
    type: String,
    default:
      "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  },
  isRead: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date()},
});

const Notif = mongoose.model("Notif", notificationShema);

module.exports = Notif;
