import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_DETAILES_POST,
  LOADING,
  UPDATE_COMMENTS,
  UPDATE_LIKES,
} from "../constants/actionsTypes";

const postsReducer = (state = {loading: true, post: {}}, action) => {
  switch (action.type) {
    case FETCH_DETAILES_POST:
      return {post: action.payload, loading: false};

    case UPDATE_COMMENTS:
      return {...state, post: action.payload};
    case LOADING:
      return {...state, loading: action.payload};

    default:
      return {...state};
  }
};

export default postsReducer;
