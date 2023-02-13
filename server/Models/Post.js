import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, required: true },
    likes: [],
    date: { type: String, default: Date() },
    image: { type: String },
  }
  //   { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

export default Post;
