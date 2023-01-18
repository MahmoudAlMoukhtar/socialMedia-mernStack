import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import Likes from "../Posts/Post/Likes";

const PostHomePage = ({post, withImage, withLikes}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {withImage && (
        <img
          src={
            post.selectedFile
              ? post.selectedFile
              : "Placeholder_view_vector.svg.png"
          }
          className="h-full rounded-xl"
        />
      )}
      <h1 className="text-xs">{moment(post.createdAt).fromNow()}</h1>
      <h1 className="text-[#4D4C7D] text-md font-semibold">{post.title}</h1>
      <p className="text-sm">{post.message.slice(0, 40)}...</p>
      <div className="flex justify-between">
        {withLikes && <Likes post={post} />}
        <Link
          to={`/posts/${post._id}`}
          className="underline underline-offset-2"
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

const PostPolitics = ({post}) => {
  return (
    <div className="flex flex-col gap-2 w-96">
      <img
        src={
          post.selectedFile
            ? post.selectedFile
            : "Placeholder_view_vector.svg.png"
        }
        className="rounded-2xl w-96 h-60"
      />
      <h1 className="text-xs">{moment(post.createdAt).fromNow()}</h1>
      <h1 className="text-[#4D4C7D] text-md font-semibold">{post.title}</h1>
      <p className="text-sm">{post.message}...</p>
      <Link to={`/posts/${post._id}`} className="underline underline-offset-2">
        Continue Reading
      </Link>
    </div>
  );
};

const Home = () => {
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
      <Form />
      <div className="flex flex-wrap-reverse lg:flex-nowrap	justify-center gap-4 w-full bg-white">
        {posts.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col gap-20 w-full">
              <section
                id="BUSINESS"
                className="flex flex-col bg-white p-2 rounded-md gap-4"
              >
                <div className="flex  justify-between">
                  <h2 className="text-lg font-semibold text-gray-600">
                    BUSINESS
                  </h2>
                  <Link to="/" className="underline underline-offset-2">
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-20 lg:gap-4">
                  <div className="flex justify-center flex-wrap md:flex-nowrap gap-6">
                    <PostHomePage
                      post={posts[0]}
                      withImage={true}
                      withLikes={true}
                    />
                    <PostHomePage
                      post={posts[1]}
                      withImage={true}
                      withLikes={true}
                    />
                  </div>
                  <div className="flex flex-row lg:flex-col gap-20 justify-between lg:justify-start bg-white p-2 rounded-md">
                    <PostHomePage post={posts[2]} />
                    <PostHomePage post={posts[3]} />
                    <PostHomePage post={posts[4]} />
                  </div>
                </div>
              </section>
              <section
                id="som posts"
                className="flex flex-col bg-white p-2 rounded-md gap-4"
              >
                <div className="flex justify-center flex-wrap lg:flex-nowrap gap-4">
                  <PostHomePage post={posts[3]} withImage={true} />
                  <PostHomePage post={posts[4]} withImage={true} />
                  <PostHomePage post={posts[5]} withImage={true} />
                  <PostHomePage post={posts[6]} withImage={true} />
                </div>
              </section>
              <section
                id="CULTURE"
                className="flex flex-col bg-white p-2 rounded-md gap-4"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold text-gray-600">
                    CULTURE
                  </h2>
                  <Link to="/" className="underline underline-offset-2">
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-20 lg:gap-4">
                  <div className="flex flex-row lg:flex-col gap-20 justify-between lg:justify-start bg-white p-2 rounded-md">
                    <PostHomePage post={posts[5]} />
                    <PostHomePage post={posts[6]} />
                    <PostHomePage post={posts[7]} />
                  </div>
                  <div className="flex justify-center flex-wrap md:flex-nowrap gap-2">
                    <PostHomePage
                      post={posts[5]}
                      withImage={true}
                      withLikes={true}
                    />
                    <PostHomePage
                      post={posts[6]}
                      withImage={true}
                      withLikes={true}
                    />
                  </div>
                </div>
              </section>
              <section
                id="POLITICS"
                className="flex flex-col bg-white p-2 rounded-md gap-4"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold text-gray-600">
                    POLITICS
                  </h2>
                  <Link to="/" className="underline underline-offset-2">
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-8 lg:gap-8">
                  {posts.map(post => (
                    <PostPolitics post={post} />
                  ))}
                </div>
              </section>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
/* 
<div className="w-full">
          <Form postId={postId} setPostId={setPostId} />
        </div>
*/
