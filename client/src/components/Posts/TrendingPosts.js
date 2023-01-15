import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import ReactPlaceholder from "react-placeholder/lib";
import "react-placeholder/lib/reactPlaceholder.css";
import {getPosts} from "../../actions/posts";

const PostTrenging = ({post, grow}) => {
  return (
    <figure className="lg:w-[400px] w-full h-80 relative drop-shadow-2xl my-1 transition duration-200 hover:scale-105 rounded-xl cursor-pointer">
      <img
        src={
          post.selectedFile
            ? post.selectedFile
            : "/Placeholder_view_vector.svg.png"
        }
        alt="Trulli"
        className={
          grow
            ? "lg:w-[400px] w-full h-80  rounded-xl brightness-[0.60] transform hover:rotate-2	transition duration-200"
            : "lg:w-[400px] w-full h-80 rounded-xl brightness-[0.60] transform hover:rotate-2	transition duration-200"
        }
      />
      <figcaption className="absolute bottom-10 left-5 text-white font-bold">
        {post.title}
      </figcaption>
    </figure>
  );
};

const TrendingPosts = ({postId, setPostId}) => {
  const posts = useSelector(state => state.posts);
  const postsSorted = posts.sort((a, b) => {
    if (a.likes.length > b.likes.length) {
      return -1;
    } else if (a.likes.length < b.likes.length) {
      return 1;
    } else {
      return 0;
    }
  });
  //console.log(posts)

  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      type="media"
      ready={!posts.length ? false : true}
      rows={20}
    >
      <div className="flex flex-col md:flex-row flex-wrap  justify-center items-start gap-10 lg:gap-2 overflow-x-scroll posts rounded-xl">
        <PostTrenging post={postsSorted[0]} />
        <PostTrenging post={postsSorted[1]} />
        <PostTrenging post={postsSorted[2]} />
        <PostTrenging post={postsSorted[3]} />
        <PostTrenging post={postsSorted[4]} />
        <PostTrenging post={postsSorted[6]} />
      </div>
    </ReactPlaceholder>
  );
};

export default TrendingPosts;
