import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {getPosts} from "../../actions/posts";

const RecentPostFooter = ({post}) => {
  return (
    <Link to={`/posts/${post._id}`} className="flex gap-4">
      <img src={post.selectedFile} className="w-40 rounded-xl" />
      <div className="flex flex-col gap-2 max-w-60">
        <h3>{post.title}</h3>
        <p>{post.message}</p>
      </div>
    </Link>
  );
};
const Footer = () => {
  const {posts, loading} = useSelector(state => state.posts);
  if (loading) return <h1>Loading....</h1>;
  return (
    <section className="flex flex-col lg:flex-row justify-between bg-[#214252] p-10 text-white text-sm gap-20">
      <div className="flex flex-col gap-4">
        <h4>ABOUT</h4>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <ul className="flex flex-col gap-2 text-gray-300">
          <Link to="/">About us</Link>
          <Link to="/">Services</Link>
          <Link to="/">Vision</Link>
          <Link to="/">Mission</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Privacy</Link>
        </ul>
        <ul className="flex flex-col gap-2 text-gray-300">
          <Link to="/">Partners</Link>
          <Link to="/">Business</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Blog</Link>
          <Link to="/">FAQ</Link>
          <Link to="/">Creative</Link>
        </ul>
      </div>
      <div className="flex flex-col gap-8">
        <RecentPostFooter post={posts[0]} />
        <RecentPostFooter post={posts[1]} />
        <RecentPostFooter post={posts[3]} />
      </div>
    </section>
  );
};

export default Footer;
