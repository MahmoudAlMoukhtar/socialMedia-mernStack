import React, {useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";
import {Link, BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./Auth/Auth";
import Profile from "./components/Profile/Profile";
import DetailPost from "./components/Posts/Post/DetailPost";
import Footer from "./components/Footer/Footer";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";
import AllPosts from "./components/ALLPosts/ALLPosts";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-12">
      <BrowserRouter>
        <Navbar />
        <div className=" flex justify-center w-full">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/AllPosts" exact component={AllPosts} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/posts/:id" exact component={DetailPost} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

// ;
