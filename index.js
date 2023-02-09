import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import router from "./Routes/Routes.js";

const app = express();

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cors({}));

app.get("/", (req, res) => {
res.send("<h2>Home<h2/>");
});

app.use("/api/hey", router);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.URL;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => `Error: ${err} Not connected`);

app.listen(5000, () => {
  console.log(`Server is running in: http://localhost:${PORT}`);
});
