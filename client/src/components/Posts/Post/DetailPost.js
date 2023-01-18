import Comments from "./Comments";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getDetailesPost} from "../../../actions/posts";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
const PupulerPost = ({post}) => {
  return (
    <Link to={`/posts/${post._id}`} className="flex gap-4">
      <img
        src={
          post.selectedFile
            ? `/${post.selectedFile}`
            : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        }
        className="w-40 rounded-xl"
      />
      <div className="flex flex-col gap-2 max-w-60">
        <h3 className="text-sm">{post.title}</h3>
        <p className="text-xs">{post.message.slice(0, 40)}...</p>
      </div>
    </Link>
  );
};

const SideBar = ({post}) => {
  const {posts, loading} = useSelector(state => state.posts);
  //console.log(posts);
  //if (loading) return <h1>Loading...</h1>;
  return (
    <div className="flex flex-col gap-20 items-center shadow-md p-2 w-80">
      <div
        id="creator_post_info"
        className="flex flex-col gap-4 items-center justify-center text-center"
      >
        <img
          src={
            post.userImage
              ? `/${post.userImage}`
              : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          className="rounded-full w-24"
        />
        <h4 className="text-xl">{post.name}</h4>
        <p className="text-[#848d92]">
          {post.bio
            ? post.bio
            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus."}
        </p>
        <button className="text-white text-sm bg-[#214252] p-2 rounded-md">
          READ MY BIO
        </button>
      </div>
      <div id="popular_posts" className="flex flex-col gap-2">
        <h4>Popular Posts</h4>
        <hr />
        {posts.length > 0 && (
          <div className="flex flex-col gap-8">
            <PupulerPost post={posts[4]} />
            <PupulerPost post={posts[5]} />
            <PupulerPost post={posts[6]} />
          </div>
        )}
      </div>
      <div id="categories" className="flex flex-col gap-2 w-full">
        <h4>Categories</h4>
        <hr />
        <div className="flex flex-col gap-4">
          <p className="flex justify-between">
            Food <span className="text-[#848d92]">(12)</span>
          </p>
          <p className="flex justify-between">
            Travel <span className="text-[#848d92]">(22)</span>
          </p>
          <p className="flex justify-between">
            Lifstyle <span className="text-[#848d92]">(37)</span>
          </p>
          <p className="flex justify-between">
            Business <span className="text-[#848d92]">(42)</span>
          </p>
        </div>
        <p className="flex justify-between">
          Adventure <span className="text-[#848d92]">(14)</span>
        </p>
      </div>
      <div id="Tags" className="flex flex-col gap-2">
        <h4>Tags</h4>
        <hr />
        <div className="flex gap-1 flex-wrap">
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Food
          </button>
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Travel
          </button>
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Lifstyle
          </button>
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Business
          </button>
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Freelancer
          </button>
          <button className="bg-gray-300 text-[#848d92] p-1 hover:bg-[#214252] hover:text-white rounded">
            Adventure
          </button>
        </div>
      </div>
    </div>
  );
};
const DetailPost = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const {post, loading} = useSelector(state => state.post);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(getDetailesPost(id));
  }, [id]);

  if (loading)
    return (
      <ClipLoader
        color="#214252"
        className="absolute  top-1/2 right-1/2 "
        size={40}
      />
    );

  return (
    <div className="w-[800px]">
      <div>
        <img
          src={
            post.selectedFile
              ? `/${post.selectedFile}`
              : "/Placeholder_view_vector.svg.png"
          }
          className="rounded w-full relative brightness-[0.30]"
        />
        <div className="flex flex-col gap-4 absolute inset-1 top-[200px] text-white">
          <h3 className=" text-center text-white text-5xl font-md">
            {post.title}
          </h3>
          <div className="flex justify-center items-center gap-2 text-sm">
            <img
              src={
                post.userImage
                  ? `/${post.userImage}`
                  : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className="rounded-full w-8"
            />
            <div className="flex justify-center gap-2">
              <h6>By {post.name}</h6>
              {" - "}
              <h6>{moment(post.createdAt).fromNow()}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-wrap md:flex-nowrap  lg:flex-row items-start justify-between gap-4 p-4 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex justify-start items-center gap-4 text-[#848d92]">
            <img
              src={
                post.userImage
                  ? `/${post.userImage}`
                  : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              className="rounded-full w-10"
            />
            <h1 className="text-sm">
              By <span className="font-semibold">{post.name}</span>
            </h1>
            <h1 className="text-xs">{moment(post.createdAt).fromNow()}</h1>
          </div>
          <p className="text-[#848d92]">{post.message}</p>
          <Comments post={post} />
        </div>
        <div>
          <SideBar post={post} />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
