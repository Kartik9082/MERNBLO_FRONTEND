import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BLOG_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store?.user?.userData?.token);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", user?.userData?.data?.user?._id);
      if (image) {
        formData.append("blogImage", image);
      }

      const res = await axios.post(`${BLOG_API_ENDPOINT}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.data;
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (data.status === "success") {
        toast.success("Blog post created successfully!");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-[#11151c] w-full h-full text-white p-10">
      <div className="w-full md:w-8/12 m-auto  p-4 md:max-w-lg md:mx-auto md:mt-8 md:min-h-[410px] bg-white text-black rounded-tr-[170px] rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block  font-bold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="title" className="block  font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter title..."
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block  font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full h-32 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="What's going in your mind..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CreateBlog;
