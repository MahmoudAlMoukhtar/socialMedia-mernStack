import React from "react";
import {useSelector} from "react-redux";
import ReactPlaceholder from "react-placeholder/lib";
import "react-placeholder/lib/reactPlaceholder.css";

const PostTrenging = ({post, grow}) => {
  return (
    <figure className="lg:max-w-[420px] w-full h-[290px] relative drop-shadow-2xl my-4 transition duration-200 rounded-xl cursor-pointer z-40">
      <img
        src={
          post.selectedFile
            ? post.selectedFile
            : "/Placeholder_view_vector.svg.png"
        }
        alt="Trulli"
        className={
          grow
            ? "w-full h-80  rounded-xl brightness-[0.60] transform	transition duration-400 hover:scale-[0.98]"
            : "w-full h-80 rounded-xl brightness-[0.60] transform	transition duration-400 hover:scale-[0.98]"
        }
      />
      <figcaption className="absolute bottom-10 left-5 text-white font-bold">
        {post.title}
      </figcaption>
    </figure>
  );
};

const TrendingPosts = () => {
  const {posts} = useSelector(state => state.posts);
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
      <div className="flex flex-col md:flex-row flex-wrap  justify-between items-start gap-10 lg:gap-2 overflow-x-scroll posts rounded-xl">
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
