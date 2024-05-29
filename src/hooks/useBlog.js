import { useDispatch } from "react-redux";
import { getBlog } from "../redux/blogslice";
import { useEffect } from "react";

const useBlog = () => {
  const dispatch = useDispatch();

  const getPosts = async () => {
    const data = await fetch(
      "https://mernblog-backend-1.onrender.com/api/v1/blogPost"
    );
    const json = await data.json();

    dispatch(getBlog(json));
  };

  useEffect(() => {
    getPosts();
  }, []);
};

export default useBlog;
