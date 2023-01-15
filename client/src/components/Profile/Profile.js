import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "../Posts/Post/Post";
import {updateProfile} from "../../actions/profile";
import Form from "../Form/Form";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const {posts} = useSelector(state => state.posts);
  const [profileData, setProfileData] = useState({
    selectedFile: "",
    fullName: "",
  });
  const dispatch = useDispatch();
  const handleChangeProfileData = () => {
    const formData = new FormData();
    formData.append("imageProfile", profileData.selectedFile);
    formData.append("fullName", profileData.fullName);
    dispatch(updateProfile(user.resulte._id, formData));
  };
  return (
    <div className="flex flex-col justify-between items-start gap-20 p-8 bg-white w-full min-h-screen">
      <div className="flex gap-2  justify-between items-start w-full">
        <div className="flex flex-col gap-4">
          <img
            src={
              user.resulte.imageProfile
                ? user.resulte.imageProfile
                : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            alt="User profile"
            className="w-60  rounded-full border-[10px] border-gray-300"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="flex gap-2 font-bold text-lg">
              {user.resulte.name ? user.resulte.name : user.resulte.fullName}
            </p>
            <p className="flex gap-2">{user.resulte.email}</p>
          </div>
        </div>
        <form className="flex flex-col gap-4 shadow-lg p-4">
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              name
            </label>
            <div className="mt-1">
              <input
                id="title"
                name="title"
                placeholder="title"
                value={profileData.fullName}
                className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  setProfileData({...profileData, fullName: e.target.value});
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex gap-4 items-end">
              <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <input
                type="file"
                id="image"
                name="image"
                className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={e => {
                  setProfileData({
                    ...profileData,
                    selectedFile: e.target.files[0],
                  });
                }}
              />
            </div>
          </div>

          <button
            type="button"
            className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleChangeProfileData}
          >
            Change
          </button>
        </form>
      </div>
      <Form />
      <div className="flex justify-center items-start w-full flex-wrap p-20">
        {posts
          .filter(
            post =>
              post.creator === user?.resulte?.googleId ||
              post.creator === user?.resulte?._id
          )
          .map(post => (
            <Post post={post} key={post._id} />
          ))}
      </div>
    </div>
  );
};

export default Profile;
