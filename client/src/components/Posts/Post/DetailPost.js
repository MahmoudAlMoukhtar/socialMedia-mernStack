import Comments from "./Comments";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getDetailesPost} from "../../../actions/posts";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {LOADING} from "../../../constants/actionsTypes";

const DetailPost = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const {post, loading} = useSelector(state => state.post);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(getDetailesPost(id));
    //console.log(post);
  }, [id]);
  //console.log(loading);
  if (loading) return <h1>loading......</h1>;
  return (
    <div className="bg-white flex flex-col-reverse lg:flex-row items-start justify-between gap-4 p-4 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start items-center gap-2 text-[#848d92]">
          <img
            src={
              user && user.resulte && user.resulte.imageUrl
                ? user.resulte.imageUrl
                : "/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            className="rounded-full w-10"
          />
          <h1 className="text-sm">
            By <span className="font-semibold">{post.name}</span>
          </h1>
          <h1 className="text-xs">{moment(post.createdAt).fromNow()}</h1>
        </div>
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <p>{post.message}</p>
        <Comments post={post} />
      </div>
      <div>
        <img
          src={
            post.selectedFile
              ? `/${post.selectedFile}`
              : "/Placeholder_view_vector.svg.png"
          }
          className="rounded-2xl w-[600px]"
        />
      </div>
    </div>
  );
};

export default DetailPost;
