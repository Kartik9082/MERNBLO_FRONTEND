import { useDispatch } from "react-redux";
import { getBlog } from "../redux/blogslice";
import { useEffect } from "react";
import { BLOG_API_ENDPOINT } from "../utils/constants";

const useBlog = () => {
  const dispatch = useDispatch();

  const getPosts = async () => {
    const data = await fetch(BLOG_API_ENDPOINT);
    const json = await data.json();

    dispatch(getBlog(json));
  };

  useEffect(() => {
    getPosts();
  }, []);
};

export default useBlog;
