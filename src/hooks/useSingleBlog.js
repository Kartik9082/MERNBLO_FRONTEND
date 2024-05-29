import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleBlog } from "../redux/blogslice";
import axios from "axios";
import { BLOG_API_ENDPOINT } from "../utils/constants";

const useSingleBlog = (id) => {
  const dispatch = useDispatch();

  const getSinglePost = async () => {
    try {
      const response = await axios.get(`${BLOG_API_ENDPOINT}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(getSingleBlog(response.data));
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getSinglePost();
    }
  }, [id, dispatch]);
};

export default useSingleBlog;
