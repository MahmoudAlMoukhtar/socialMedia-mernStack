import * as api from "../api/index";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_DETAILES_POST,
  LOADING,
  UPDATE_COMMENTS,
  UPDATE_LIKES,
} from "../constants/actionsTypes";
import jwt_decode from "jwt-decode";
export const getPosts = () => async dispatch => {
  try {
    dispatch({type: "LOADING", payload: true});
    const response = await api.fetchPosts();
    dispatch({type: FETCH_ALL, payload: response.data});
    dispatch({type: "LOADING", payload: false});
  } catch (err) {
    console.log(err.message);
  }
};

export const getDetailesPost = id => async dispatch => {
  //console.log(id.id);
  try {
    dispatch({type: LOADING, payload: true});
    const {data} = await api.fetchPostById(id.id);
    dispatch({type: FETCH_DETAILES_POST, payload: data});
  } catch (err) {
    console.log(err.message);
  }
};
export const createPost = newPost => async dispatch => {
  try {
    const response = await api.createPosts(newPost);
    dispatch({type: CREATE, payload: response.data});
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = (id, updates) => async dispatch => {
  try {
    const response = await api.updatePost(id, updates);
    dispatch({type: "UPDATE", payload: response.data});
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);
    dispatch({type: DELETE, payload: id});
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = id => async dispatch => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const {data} = await api.likePost(id);
    dispatch({type: UPDATE_LIKES, payload: data});
    //notify
    const notify = {
      id: data.id,
      text: `${user.resulte.fullName} like on your post !`,
      url: `/posts/${data._id}`,
      creator: data.creator,
      image: user?.resulte?.imageProfile,
    };
    const response = await api.addNotify(notify);
    if (response.data.creator === jwt_decode(user.token).sub) {
      dispatch({type: "ADD_NOTIFY", payload: response.data});
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const commentPost = (value, id) => async dispatch => {
  const user = JSON.parse(localStorage.getItem("profile"));
  try {
    const {data} = await api.commentPost(value, id);
    dispatch({type: UPDATE_COMMENTS, payload: data});
    //notify
    const notify = {
      id: data.id,
      text: `${user.resulte.fullName} commented on your post !`,
      url: `/posts/${data._id}`,
      creator: data.creator,
      image: user?.resulte?.imageProfile,
    };
    const response = await api.addNotify(notify);
    if (response.data.creator === jwt_decode(user.token).sub) {
      dispatch({type: "ADD_NOTIFY", payload: response.data});
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteCommentPost = (idPost, idComment) => async dispatch => {
  try {
    const {data} = await api.deleteCommentPost(idPost, idComment);
    dispatch({type: UPDATE_COMMENTS, payload: data});
  } catch (err) {
    console.log(err.message);
  }
};

//Notifycations
export const getNotifycations = () => async dispatch => {
  try {
    //dispatch({type: "LOADING", payload: true});
    const response = await api.fetchNotifycations();
    dispatch({type: "FETCH_ALL_NOTIFY", payload: response.data});
    //dispatch({type: "LOADING", payload: false});
  } catch (err) {
    console.log(err.message);
  }
};

export const updateNotifycations = id => async dispatch => {
  try {
    //dispatch({type: "LOADING", payload: true});
    const response = await api.updateNotifycations(id);
    dispatch({type: "FETCH_ALL_NOTIFY", payload: response.data});
    //dispatch({type: "LOADING", payload: false});
  } catch (err) {
    console.log(err.message);
  }
};
