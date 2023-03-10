import React, {useState} from "react";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
import * as api from "../../api/index";
const Form = ({postId, setPostId}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    category: [],
    selectedFile: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleUpload = e => {
    const file = e.target.files[0];
    const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validFileTypes.find(type => type === file.type)) {
      setError("File must be in JPG/PNG format");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPostData({...postData, selectedFile: reader.result});
      };
      //setPostData({...postData, selectedFile: file});
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!postData.selectedFile) return;

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("userImage", user?.resulte?.imageProfile);
    formData.append("name", user?.resulte?.fullName);
    formData.append("message", postData.message);
    formData.append("tags", postData.tags);
    formData.append("image", postData.selectedFile);
    formData.append("category", postData.category);

    //upload images
    dispatch(createPost(formData));

    //console.log("imageBase64String", postData.selectedFile);
    //dispatch(createPost(formData));
    //let formDataObject = Object.fromEntries(formData.entries());
    /* if(postId){
          dispatch(updatePost(postId, postData))
        }else{
          
        } */
  };

  const clear = () => {
    setPostData({title: "", message: "", tags: "", selectedFile: ""});
  };
  if (!user?.resulte?.name && !user?.resulte?.fullName) {
    return (
      <div className="text-center font-bold bg-white p-8 rounded-md shadow-xl w-full">
        <h1>Please Sign in to create your own posts and like other's posts</h1>
      </div>
    );
  }
  return (
    <form
      action="#"
      method="POST"
      onSubmit={handleSubmit}
      className="min-w-[400px] shadow-xl flex flex-col gap-8 items-start w-full justify-center bg-white p-2 transition duration-200 rounded-md"
    >
      <h1 className="font-bold flex flex-col gap-1 items-start">
        Form{" "}
        <span className="text-sm text-gray-400 font-normal">
          write your post and puplish it...
        </span>
      </h1>

      <div className="w-full">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          title
        </label>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            placeholder="title"
            value={postData.title}
            className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={e => {
              setPostData({...postData, title: e.target.value});
            }}
          />
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="Category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <div className="mt-1">
          <input
            id="Category"
            name="Category"
            placeholder="Category"
            value={postData.category}
            className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={e => {
              setPostData({...postData, category:[ e.target.value]});
            }}
          />
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="message"
            value={postData.message}
            onChange={e => {
              setPostData({...postData, message: e.target.value});
            }}
          />
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          tags
        </label>
        <div className="mt-1">
          <input
            id="tags"
            name="tags"
            placeholder="tags"
            value={postData.tags}
            className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={e => {
              setPostData({...postData, tags: e.target.value});
            }}
          />
        </div>
      </div>
      {postData.selectedFile && <img src={postData.selectedFile} />}
      <div className="w-full">
        {error && <h1 className="text-red-700 font-semibold">{error}</h1>}
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          image
        </label>
        <div className="mt-1">
          <input
            type="file"
            id="image"
            name="image"
            htmlFor="image"
            className="block w-full h-8 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={handleUpload}
          />
        </div>
      </div>

      <div className="flex gap-2 py-2 w-full">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-[#214252] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#214252] focus:outline-none focus:ring-2 focus:ring-[#214252] focus:ring-offset-2 w-2/3"
        >
          Submit
        </button>

        <div
          onClick={clear}
          className="inline-flex justify-center rounded-md border border-transparent bg-[#214252] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#214252] focus:outline-none focus:ring-2 focus:ring-[#214252] focus:ring-offset-2 cursor-pointer w-1/3"
        >
          clear
        </div>
      </div>
    </form>
  );
};

export default Form;
