import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMENT_API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { addComment } from "../redux/blogslice";

const CreateComment = ({ _id }) => {
  const [formData, setFormData] = useState({
    comment: "",
    user: "",
    post: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((store) => store?.user?.userData?.token);

  const user = useSelector((store) => store.user);
  if (!user.isLoggedIn) {
    return (
      <div className="flex justify-center items-center w-full border-l-2 bg-white font-semibold text-xs p-2">
        You need to login first to comment
      </div>
    );
  }

  const userId = user?.userData?.data?.user?._id;
  if (!userId) {
    console.error("User ID is not available");
    return null;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
      user: userId,
      post: _id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment) {
      return toast.error("You can't post an empty comment");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post(COMMENT_API_ENDPOINT, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = res?.data;
      if (responseData && responseData.success === false) {
        setLoading(false);
        return setErrorMessage(responseData.message);
      }

      setLoading(false);
      if (responseData?.status === "success") {
        dispatch(addComment(formData));
        setFormData({
          comment: "",
          user: userId,
          post: _id,
        });
        toast.success("Comment added successfully");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col w-full mb-2  bg-[#111111]">
      <form onSubmit={handleSubmit} className="mt-2 p-4 flex flex-col">
        <input
          className=" bg-[#111111] text-white border-b-2 rounded-lg px-3 py-2 w-full focus:outline-none"
          value={formData.comment}
          id="comment"
          onChange={handleChange}
          type="text"
          placeholder="Enter Comment"
        />
        <button
          className="m-2 w-20 p-2 rounded-xl bg-black text-white"
          type="submit"
        >
          {loading ? "Loading" : "Post"}
        </button>
      </form>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default CreateComment;
