const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    // topic: String,
    // views: {
    //   type: Number,
    //   default: 0,
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogsUser",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", PostSchema);

module.exports = Post;
