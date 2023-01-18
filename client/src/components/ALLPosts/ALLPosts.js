import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import Likes from "../Posts/Post/Likes";

const AllPosts = () => {
  const {posts, loading} = useSelector(state => state.posts);
  const [postId, setPostId] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, location]);

  //const postsBUSINESS = posts.slice(0, 5);
  return (
    <div className="flex flex-col gap-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap-reverse lg:flex-nowrap	justify-center gap-4 w-full bg-white">
        {posts.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col gap-60 w-full">
              <Posts />
            </div>
          </React.Fragment>
        )}
        <Form />
      </div>
    </div>
  );
};

export default AllPosts;
/* 
<div className="w-full">
          <Form postId={postId} setPostId={setPostId} />
        </div>
*/
