import React from "react";
import {useSelector} from "react-redux";
import Post from "./Post/Post";
import ReactPlaceholder from "react-placeholder/lib";
import "react-placeholder/lib/reactPlaceholder.css";

const Posts = ({postId, setPostId}) => {
  const {posts} = useSelector(state => state.posts);
  //console.log(posts)

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="media"
      ready={!posts.length ? false : true}
      rows={20}
    >
      <div className=" flex flex-col gap-8 items-center justify-center bg-white p-2 transition duration-200 rounded-md">
        <h1 className="font-bold">Posts</h1>
        <div className="flex justify-center items-center flex-wrap gap-2 overflow-y-scroll h-screen posts">
          {posts.length > 0 &&
            posts.map(post => (
              <Post post={post} key={post._id} setPostId={setPostId} />
            ))}
        </div>
      </div>
    </ReactPlaceholder>
  );
};

export default Posts;
