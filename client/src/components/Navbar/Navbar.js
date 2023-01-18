import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory, useLocation} from "react-router-dom";
import {logout} from "../../actions/auth";
import {getNotifycations, updateNotifycations} from "../../actions/posts";
import {IoIosNotifications} from "react-icons/io";
import jwt_decode from "jwt-decode";
import moment from "moment";

const Navbar = () => {
  const [notivication, setNotivication] = useState();
  const [showDropDown, setShowDropDown] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const {notifyies} = useSelector(state => state.notify);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  //console.log(notifyies[3].creator === jwt_decode(user.token).sub);
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
    dispatch(getNotifycations());
  }, [dispatch, location]);
  //console.log(user.resulte.imageProfile);
  return (
    <div className="flex justify-between items-center bg-[#214252] text-white py-2 font-semibold px-6 lg:px-8">
      <Link to="/" className="text-3xl">
        Blogy.
      </Link>
      <nav className="flex gap-4 items-end">
        <Link to="/" className="text-sm text-gray-300">
          Home
        </Link>
        <Link to="/" className="text-sm text-gray-300">
          Pages
        </Link>
        <Link to="/" className="text-sm text-gray-300">
          Culture
        </Link>
        <Link to="/" className="text-sm text-gray-300">
          Business
        </Link>
        <Link to="/" className="text-sm text-gray-300">
          Politics
        </Link>
      </nav>

      {user ? (
        <ul
          className="flex gap-4 items-center"
          onBlur={() => setShowDropDown(false)}
        >
          <div>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
            >
              <span className="absolute top-0 right-0 bg-red-700 rounded-full text-[8px] px-1">
                {notifyies.filter(noty => noty.isRead === false).length}
              </span>
              <IoIosNotifications size={20} />
            </div>
            <ul
              className={
                showDropDown
                  ? "text-black bg-white rounded absolute right-20 mt-6 flex flex-col items-center gap-2 shadow-lg border border-black w-[250px] z-40"
                  : "text-black bg-white rounded absolute hidden mt-4 flex flex-col gap-2"
              }
            >
              {notifyies.length > 0 &&
                notifyies.map(noty => (
                  <button
                    onClick={() => {
                      dispatch(updateNotifycations(noty._id));
                      history.push(noty.url);
                    }}
                    className="flex flex-col gap-2 shadow-md border-b-[0.5px] border-gray-400 p-2 w-full"
                  >
                    <img
                      src={noty.image}
                      alt="user"
                      className="w-6 rounded-full"
                    />
                    <h5
                      className={
                        noty.isRead ? "text-sm" : "text-xs text-red-800"
                      }
                    >
                      {noty.text}
                    </h5>
                    <span className="text-xs text-gray-400">
                      {moment(noty.createdAt).fromNow()}
                    </span>
                  </button>
                ))}
            </ul>
          </div>
          <Link to="/profile">
            <img
              alt="User pofile"
              src={user && user.resulte.imageProfile}
              className="w-8 rounded-full"
            />
          </Link>
          <h3 className="text-sm">
            {user.resulte.name ? user.resulte.name : user.resulte.fullName}
          </h3>
          <button
            className="py-1 px-2 bg-white rounded text-black"
            onClick={() => {
              dispatch(logout());
              history.push("/");
              setUser(null);
            }}
          >
            Logout
          </button>
        </ul>
      ) : (
        <Link to="/auth" className="py-1 px-2 bg-white rounded text-black">
          SignIn
        </Link>
      )}
    </div>
  );
};

export default Navbar;

/* 
<ul className="flex gap-2 items-center text-black">
        <input
          type="search"
          placeholder="Search..."
          className="h-8 rounded p-2"
        />
      </ul>
*/
