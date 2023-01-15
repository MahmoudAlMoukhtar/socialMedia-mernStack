import {useState} from "react";
import {useDispatch} from "react-redux";
import {commentPost, deleteCommentPost} from "../../../actions/posts";
import {v4 as uuidv4} from "uuid";
import jwt_decode from "jwt-decode";
import moment from "moment";

const Comments = ({post}) => {
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleSubmitComment = e => {
    const finalComment = {
      id: uuidv4(),
      token: user?.token,
      image: user?.resulte?.imageProfile,
      name: user?.resulte?.fullName,
      text: comment,
      createdAt: new Date().toISOString(),
    };
    dispatch(commentPost(finalComment, post._id));
  };
  const handleDeletComment = (idPost, idComment) => {
    dispatch(deleteCommentPost(idPost, idComment));
  };

  // const token = post.comments[4].token;
  // const decoded = jwt_decode(token);
  // console.log("decoded", decoded.email);

  return (
    <div className="flex flex-col gap-4">
      {user && (
        <div className="flex flex-col gap-2">
          <h3 className="text-md">Write Comment</h3>
          <div className="flex gap-2">
            <textarea
              type="text"
              onChange={e => setComment(e.target.value)}
              className="border-2 border-gray-400 rounded-md"
            />
            <button
              onClick={handleSubmitComment}
              className="bg-[#214252] text-white rounded p-2"
            >
              Comment
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <h3 className="flex flex-col gap-4 font-semibold">
          {post?.comments?.length} Comments <hr />
        </h3>
        <div className="w-96">
          {post && post.comments && post.comments.length > 0 ? (
            post.comments.map(c => (
              <div className="flex flex-col flex-wrap gap-2 rounded-lg p-2 w-full">
                <div className="flex items-start justify-start gap-6">
                  <img
                    src={`/${c.image}`}
                    alt="user profile"
                    className="rounded-full w-12"
                  />
                  <div className="flex justify-between items-start gap-2 p-2 shadow-md w-full">
                    <div>
                      <h4 className="text-lg">{c.name}</h4>
                      <h4 className="text-[#ccc] text-sm">
                        {moment(c.createdAt).fromNow()}
                      </h4>
                      <p className="text-gray-400 font-semibold text-sm">
                        {c.text}
                      </p>
                    </div>
                    {user &&
                      user.resulte &&
                      user.resulte.email === jwt_decode(c.token).email && (
                        <button
                          className="text-sm bg-black p-1 text-white rounded text-xs"
                          onClick={() => handleDeletComment(post._id, c.id)}
                        >
                          Delete
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>not Comments exist</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
