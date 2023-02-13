{
  /*

import express from "express";
import {
  registration,
  login,
  updateProfile,
  getProfile,
  sendMessage,
  receiveMessage,
  getUsers,
  deleteMessage,
} from "../Controller/authController.js";
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/update-profile", updateProfile);
router.post("/send-message", sendMessage);
router.get("/receive-message", receiveMessage);
router.get("/profile", getProfile);
router.get("/users", getUsers);
router.delete("/delete-message/:id", deleteMessage);

export default router;
//////////////////////////////////////////////////////////////
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";
import dotenv from "dotenv";
import Message from "../Model/MessageModel.js";
import mongoose from "mongoose";
dotenv.config();

export const registration = async (req, res) => {
  try {
    const { name, email, dp } = req.body; // { name:..., email:..., password: }
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const encryptedData = { name, email, dp, password: newPassword };
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
        { name: user.name, email: user.email },
        process.env.KEY
      );
      return res.status(200).json({
        success: true,
        token: token,
        msg: "User verified successfully",
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

export const getProfile = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    const other = await User.find({});
    const connections = other.filter((u) => {
      return u.email !== email;
    });
    return res
      .status(200)
      .json({ success: true, data: user, users: connections });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Invalid jwt token" });
  }
};

export const updateProfile = async (req, res) => {
  const token = req.headers["x-access-token"]; // const headers = { x-access-token: "jwt_generated_token"}
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const email = decoded.email;
    const { name, dp } = req.body;
    await User.updateOne({ email: email }, { $set: { name, dp } });
    return res.status(200).json({ success: true, msg: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Invalid jwt token" });
  }
};

export const getUsers = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decode = jwt.verify(token, process.env.KEY);
    const email = decode.email;
    const users = await User.find({});
    const filter = users.filter((user) => {
      return user.email !== email;
    });
    const loginUser = users.filter((user) => {
      return user.email === email;
    });
    return res.status(200).json({
      success: true,
      msg: "users fetch successfully",
      data: filter,
      login: loginUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `Not able to find users- ${error}` });
  }
};

export const sendMessage = async (req, res) => {
  const token = req.headers["x-access-token"];
  const { message, user } = req.body;
  try {
    const decode = jwt.verify(token, process.env.KEY);
    const email = decode.email;
    const receiver = email + user;
    const sendMsg = new Message({
      message: message,
      room: receiver,
      sender: email,
      date: new Date(),
    });
    await sendMsg.save();
    return res.status(201).json({ success: true, data: sendMsg });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `Not able to send message- ${error}` });
  }
};

export const receiveMessage = async (req, res) => {
  const token = req.headers["x-access-token"];
  const receiver = req.headers["receiver"];
  try {
    const decode = jwt.verify(token, process.env.KEY);
    const email = decode.email;
    const messages = await Message.find({});
    const first = email + receiver;
    const second = receiver + email;
    const findRoom = messages.filter((user) => {
      if (user.room === first || user.room === second) {
        return user;
      }
    });
    const sort = findRoom.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return res
      .status(200)
      .json({ success: true, msg: "message get successfully", data: sort });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `Not able to find message- ${error}` });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const del = await Message.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, msg: "message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `Not able to delete message- ${error}` });
  }
};

*/
}
