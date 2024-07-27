import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path";

import "./passport/github.auth.js";

import userRoute from "./routes/user.route.js";
import exploreRoute from "./routes/explore.route.js";
import authRoute from "./routes/auth.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// console.log(__dirname);

dotenv.config();
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "../frontend/dist")));
// console.log(path.join(__dirname, "../frontend/dist"));
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoute);
app.use("/api/explore", exploreRoute);
app.use("/api/auth", authRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
