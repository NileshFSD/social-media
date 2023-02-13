import express from "express";
import {
  connectionsPost,
  createPost,
  deletePost,
  deleteUser,
  followUser,
  getFollowing,
  getPost,
  getSuggestions,
  getUser,
  homePage,
  likeDislike,
  login,
  registration,
  updatePost,
  updateUser,
} from "../Controller/AuthController.js";

const router = express.Router();

// Authentication Routes--------------
router.get("/home", homePage);
router.post("/auth/registration", registration);
router.post("/auth/login", login);

// User routes-------------------------------
router.get("/user", getUser);
router.get("/user-suggestions/:id", getSuggestions);
router.put("/user/update/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/follow-unfollow/:id", followUser);
router.get("/user/get-following-followers-list", getFollowing);
// Post routes------------------------------------
router.post("/create-post", createPost);
router.get("/get-post/:id", getPost);
router.put("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);
router.put("/post/like-dislike/:id", likeDislike);
router.get("/connection-post/:id", connectionsPost);

export default router;
