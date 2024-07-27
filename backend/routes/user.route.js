import express from "express";
import {
  getUserProfileAndRepos,
  likeProfile,
  getLikes,
} from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const Router = express.Router();

Router.get("/profile/:username", getUserProfileAndRepos);
Router.post("/like/:username", ensureAuthenticated, likeProfile);
Router.post("/likes", ensureAuthenticated, getLikes);

export default Router;
