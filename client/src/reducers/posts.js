import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_DETAILES_POST,
  UPDATE_COMMENTS,
  UPDATE_LIKES,
} from "../constants/actionsTypes";

const postsReducer = (state = {loading: true, posts: []}, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {...state, posts: action.payload};
    case "LOADING":
      return {...state, loading: action.payload};

    case CREATE:
      return {...state, posts: [action.payload, ...state.posts]};
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return {...state};
  }
};

export default postsReducer;
