import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    dp: {
      type: String,
    },
    cover: {
      type: String,
    },
    about: { type: String },
    relationship: { type: String },
    following: [],
    followers: [],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
