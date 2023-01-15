import {AUTH, LOGOUT, SIGNIN} from "../constants/actionsTypes";
const auth = (auth = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({...action?.payload}));
      return {...auth, authData: action?.payload};
    case SIGNIN:
      localStorage.setItem("profile", JSON.stringify({...action?.payload}));
      return {...auth, authData: action?.payload};
    case LOGOUT:
      localStorage.removeItem("profile");
      console.log("logout success!");
      return auth;
    default:
      return auth;
  }
};

export default auth;
