import React, {useEffect, useState} from "react";
import {AiTwotoneLike, AiOutlineLike} from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";
import {FaRegComments} from "react-icons/fa";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";
import {Link} from "react-router-dom";

const Post = ({post}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleDelete = id => {
    //console.log(id);
    dispatch(deletePost(id));
  };
  const handleUpdateLike = id => {
    dispatch(likePost(id));
  };

  const Likes = ({post}) => {
    if (post.likes.length > 0) {
      return post.likes.find(
        like => like === (user?.resulte?.googleId || user?.resulte?._id)
      ) ? (
        <div className="flex items-center gap-2">
          <AiTwotoneLike
            size={20}
            className="cursor-pointer"
            onClick={() => handleUpdateLike(post._id)}
          />
          <p>
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `like${post.likes.length > 1 ? "s" : ""} ${post.likes.length}`}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <AiOutlineLike
            size={20}
            className="cursor-pointer"
            onClick={() => handleUpdateLike(post._id)}
          />
          <p>
            {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
          </p>
        </div>
      );
    }
    return (
      <AiOutlineLike
        className="cursor-pointer"
        size={20}
        onClick={() => handleUpdateLike(post._id)}
      />
    );
  };
  //console.log(post);
  return (
    <div className="shadow-lg p-2 flex flex-col justify-center gap-4 rounded-xl bg-white w-full max-w-[600px]">
      <div className="flex justify-between">
        <div className="flex  justify-center items-center gap-2 text-[#848d92]">
          <img
            src={
              post.userImage ||
              "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className="rounded-full w-10"
          />
          <h1 className="text-sm">
            By <span className="font-semibold">{post.name}</span>
          </h1>
          <h1 className="text-xs">{moment(post.createdAt).fromNow()}</h1>
        </div>
        {(user?.resulte?.googleId === post?.creator ||
          user?.resulte?._id === post?.creator) && (
          <div className="flex flex-col items-end relative">
            <BsThreeDots
              size={25}
              className="cursor-pointer"
              onClick={() => setShowDropDown(!showDropDown)}
            />
            <ul
              className={
                showDropDown
                  ? "bg-white rounded p-2 absolute mt-6 flex flex-col items-center gap-2 shadow-lg border border-black"
                  : "bg-white rounded p-2 absolute hidden mt-4 flex flex-col gap-2"
              }
            >
              <li className="cursor-pointer">Update</li>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleDelete(post._id)}
              >
                <p>Delete</p>
                <AiOutlineDelete
                  className="cursor-pointer"
                  fill="currentColor"
                  color="black"
                  stroke="black"
                />
              </button>
            </ul>
          </div>
        )}
      </div>
      <Link to={`/posts/${post._id}`}>
        <img
          src={
            post.selectedFile
              ? post.selectedFile
              : "Placeholder_view_vector.svg.png"
          }
          className="rounded-2xl"
        />
      </Link>
      <h1 className="text-[#4D4C7D] text-2xl">{post.title}</h1>
      <p>{post.message}</p>
      <div className="flex justify-between items-center">
        {post.tags.map(tag => (
          <p>#{tag}</p>
        ))}
      </div>

      <div className="flex justify-between border-t-[1px] border-gray-300 py-2 rounded">
        <Likes post={post} />
        <Link to={`/posts/${post._id}`} className="flex items-center gap-2">
          <p>comments </p>
          <p>{post.comments.length}</p>
          <FaRegComments className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Post;
