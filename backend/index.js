const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const salt1 = bcrypt.genSaltSync(10);

const secret = "hkdjhajklnajksdnanasmdasd";

const cookieParser = require("cookie-parser");

const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://lets-blog-9c7a5.web.app/",
  })
);

app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

const mongoURL =
  "mongodb+srv://devansh0331_:JGeSJuQE0ua5L4a5@cluster0.eppfmtt.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
var db = mongoose.connection;

app.post("/register", async (req, res) => {
  // res.json("Ok");
  const { username, password, email } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt1),
      email,
    });
    res.json(newUser).status(200);
  } catch (error) {
    res.json(error).status(400);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  try {
    const passOK = bcrypt.compareSync(password, userDoc.password);

    if (passOK) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.json("wrong credentials").status(400);
    }
  } catch (error) {
    res.json("Server Error").status(500);
  }
  // console.log(passOK);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  // res.json({ ext });

  // res.json({ title, summary, content, newPath });
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
  // res.json("ok");
});

app.get("/post", async (req, res) => {
  const response = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(response);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  // res.json(req.params);
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  // postDoc.views++;
  // await Post.updateOne({ _id: id }, { views: views + 1 });
  // console.log(postDoc);

  res.json(postDoc);
});

app.listen(5000, (req, res) => {
  console.log("Serving on port 5000");
});
