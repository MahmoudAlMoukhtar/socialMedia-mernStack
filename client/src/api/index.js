import axios from "axios";

const API = axios.create({
  baseURL: "https://socialmedia-mernstack.vercel.app/api",
});
/*  */
API.interceptors.request.use(req => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
//CRUD POSTS
export const fetchPosts = () => API.get("/posts");
export const createPosts = newPost => API.post("/posts", newPost);
export const fetchPostById = id => API.get(`/posts/${id}`);
export const updatePost = (id, updates) => API.patch(`/posts/${id}`, updates);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) =>
  API.post(`/posts/${id}/commentPost`, {value});

export const deleteCommentPost = (idPost, idComment) =>
  API.post(`/posts/${idPost}/commentPost/${idComment}`);

//AUTH Operation
export const signin = formData => API.post("/user/signin", formData);
export const signup = formData => API.post("/user/signup", formData);
export const updateProfile = (id, updates) =>
  API.put(`/user/updateProfile/${id}`, updates);

//notify
export const addNotify = notify => API.post(`/notify`, notify);
export const fetchNotifycations = () => API.get("/notify");
export const updateNotifycations = id => API.get(`/notify/${id}`);
