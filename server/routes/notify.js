const express = require("express");
const Notif = require("../models/Notification");
const authMW = require("../middleware/authMW");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", authMW, async (req, res) => {
  try {
    const notifications = await Notif.find({
      creator: req.userId,
      isRead: false,
    });
    //console.log(notifications);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
});

router.post("/", authMW, async (req, res) => {
  const notify = req.body;
  //console.log("userId", req.userId);
  //console.log(notify);

  try {
    const newNotif = new Notif({
      ...notify,
      createdAt: new Date().toISOString(),
    });
    //console.log(newNotif);
    await newNotif.save();
    res.status(201).json(newNotif);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put("/:id", authMW, async (req, res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post with that id");
  }
  try {
    await Notif.findByIdAndUpdate(
      _id,
      {isRead: true},
      {
        new: true,
      }
    );
    const notifications = await Notif.find({
      creator: req.userId,
      isRead: false,
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
