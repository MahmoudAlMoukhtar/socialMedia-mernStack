import {combineReducers} from "redux";
import posts from "./posts";
import auth from "./auth";
import post from "./post";
import notify from "./notify";

export default combineReducers({
  posts,
  post,
  notify,
  auth,
});
