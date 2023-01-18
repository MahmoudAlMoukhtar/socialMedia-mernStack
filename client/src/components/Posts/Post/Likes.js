import {AiTwotoneLike, AiOutlineLike} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {likePost} from "../../../actions/posts";

const Likes = ({post}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleUpdateLike = id => {
    dispatch(likePost(id));
  };
  if (post.likes.length > 0) {
    return post.likes.find(
      like => like === (user?.resulte?.googleId || user?.resulte?._id)
    ) ? (
      <div className="flex items-center gap-2 text-xs">
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

export default Likes;
