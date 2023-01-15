import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import TrendingPosts from "../Posts/TrendingPosts";
import {useLocation} from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = () => {
  const [postId, setPostId] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, location]);
  return (
    <div>
      <div className="flex flex-wrap-reverse lg:flex-nowrap	justify-center gap-4 w-full">
        <div className="w-full">
          <Posts postId={postId} setPostId={setPostId} />
        </div>
        <div className="w-full">
          <Form postId={postId} setPostId={setPostId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
