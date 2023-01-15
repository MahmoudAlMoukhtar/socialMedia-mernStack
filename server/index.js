const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const notifyRoutes = require("./routes/notify");
const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notify", notifyRoutes);
app.use(express.static(__dirname + "/public"));
app.use(
  "/",
  express.static("/path/to/temporary/directory/to/store/uploaded/files")
);
const CONNECTION_URL =
  "mongodb+srv://mahmoudalmoukhtar:JK2zdSPs8XlgDzE8@cluster1.sdgvw0s.mongodb.net/?retryWrites=true&w=majority";
const CONNECTION_URL_COMPAS = "mongodb://localhost:27017/social-media";
const PORT = process.env.PORT || 3001;
mongoose
  .connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("success connection database");

    app.listen(PORT, () => {
      console.log(`success listning on ${PORT}`);
    });
  })
  .catch(err => {
    console.log("error connection database!!!");
    console.log(err.message);
  });
