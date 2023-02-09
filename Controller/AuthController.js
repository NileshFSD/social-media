import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Post from "../Models/Post.js";
import mongoose from "mongoose";
dotenv.config();

export const homePage = (req, res) => {
  res.status(200).send("<h2>Home Page </h2>");
};

// ------------------------------REGISTRATION---------------------------------------
export const registration = async (req, res) => {
  try {
    const { username, firstname, lastname, email, dp } = req.body;
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const encryptedData = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: newPassword,
    };
    const registeredData = new User(encryptedData);
    await registeredData.save();
    res.status(200).json({
      success: true,
      data: registeredData,
      msg: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
      msg: `Something went wrong: ${error}`,
    });
  }
};

// ------------------------------LOGIN---------------------------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: `User with email: ${email} not found` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.KEY
      );
      return res.status(200).json({
        success: true,
        token: token,
        msg: "User Login successfully",
      });
    } else {
      return res.status(400).json({ success: false, msg: "Password invalid" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// ------------------------------GET SINGLE USER----------------------------------

export const getUser = async (req, res) => {
  // const id = req.params.id;
  const token = req.headers["user-access-token"];
  try {
    const decode = jwt.verify(token, process.env.KEY);
    const email = decode.email;
    const user = await User.findOne({ email: email });
    res.status(200).json({
      success: true,
      data: user,
      msg: "User verified successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// -----------------------GET SUGGESTIONS-----------------------

export const getSuggestions = async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({});
    const user = await User.findById(id);
    const data = users.filter((u) => {
      return !user.following.includes(u._id);
    });

    const suggestions = data.filter((u) => {
      return u._id != id;
    });

    res.status(200).json({
      success: true,
      data: suggestions,
      msg: "Suggestion got successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};
// ------------------------------UPDATE USER---------------------------------------

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, password } = req.body;
  if (id === currentUserId) {
    try {
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        success: true,
        data: user,
        msg: "User updated successfully",
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: error, msg: "Something went wrong" });
    }
  } else {
    res.status(403).json({ success: false, msg: "Accessed Denied" });
  }
};

// ------------------------------DELETE USER---------------------------------------
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  try {
    if (id === currentUserId) {
      const user = await User.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        data: user,
        msg: "User deleted successfully",
      });
    } else {
      return res.status(403).json({
        success: true,
        msg: "User not found ",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// ------------------------------FOLLOWING---------------------------------------

export const getFollowing = async (req, res) => {
  const token = req.headers["user-access-token"];
  const decode = jwt.verify(token, process.env.KEY);
  try {
    const userId = decode.id;
    const users = await User.find({});
    const following = users.filter((u) => {
      return u.followers.includes(userId);
    });
    const followers = users.filter((u) => {
      return u.following.includes(userId);
    });
    console.log(followers);
    res.status(200).json({
      success: true,
      msg: "Following list got successfully ",
      following: following,
      followers: followers,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    res.status(403).json({ success: false, msg: "User Prohibited" });
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json({
          success: true,
          msg: "User followed ",
        });
      } else {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(403).json({ success: true, msg: "User unfollowed " });
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, error: error, msg: "Something went wrong" });
    }
  }
};

// -------------------------------Add post-------------------------------------------
export const createPost = async (req, res) => {
  const data = req.body;

  try {
    const newPost = new Post(data);
    const post = await newPost.save();
    res.status(200).json({
      success: true,
      data: post,
      msg: "Post created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// -----------------------GET POST--------------------------------------

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.find({});
    const post = posts.filter((p) => {
      return p.userId === id;
    });
    res.status(200).json({
      success: true,
      data: post,
      msg: "post got successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// -----------------------UPDATE POST--------------------------------------

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
        data: post,
        msg: "post updated successfully",
      });
    } else {
      res.status(403).json({
        success: false,
        msg: "Action denied",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// -----------------------DELETE POST--------------------------------------
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (userId === post.userId) {
      await post.deleteOne();
      res.status(200).json({
        success: true,
        data: post,
        msg: "post deleted successfully",
      });
    } else {
      res.status(403).json({
        success: false,
        msg: "Action denied",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// ----------------------------Like-Dislike------------------------------------------
export const likeDislike = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json({
        success: true,
        msg: "Liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({
        success: true,
        msg: "Unliked",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error, msg: "Something went wrong" });
  }
};

// ------------------------------GET POST OF FOLLOWING-------------------

export const connectionsPost = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
