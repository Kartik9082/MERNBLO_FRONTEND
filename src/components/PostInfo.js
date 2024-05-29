import { Link, useParams } from "react-router-dom";
import useSingleBlog from "../hooks/useSingleBlog";
import { useSelector } from "react-redux";
import { FaCommentAlt } from "react-icons/fa";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { IoIosArrowRoundBack } from "react-icons/io";

const PostInfo = () => {
  const [toggleComment, setToggleComment] = useState(true);
  const { id } = useParams();
  useSingleBlog(id);
  const blog = useSelector((store) => store?.blogs?.singleBlog?.data?.post);
  const userId = blog?.author?._id;

  console.log(blog, "image");
  if (!blog)
    return (
      <div className="text-red-600 font-medium text-2xl text-center flex justify-center  items-center">
        {" "}
        Unable To fetch Details{" "}
      </div>
    );

  const handleToggle = () => {
    setToggleComment(!toggleComment);
  };

  return (
    <div className="flex flex-col items-center min-w-[80%] bg-[#000000] min-h-[100vh]">
      <div className="w-10/12 md:w-8/12 flex flex-col mt-4 p-4 bg-[#111111] text-white rounded-xl mb-4">
        <Link to="/">
          <p className="text-white">
            <IoIosArrowRoundBack size={30} />
          </p>
        </Link>

        <div className="flex flex-wrap  md:flex md:justify-between md:items-center m-2 p-2 border-b-2">
          <div className="w-full text-2xl font-bold md:w-[70%] mb-2">
            {blog.title}
          </div>
          <Link to={"/user/" + userId}>
            <h1 className="text-yellow-200 w-full md:w-[30%]text-sm md:border-b-2 hover:text-yellow-800 transition delay-75 ease-in-out">
              {blog?.author?.name}
            </h1>
          </Link>
        </div>
        <div className="flex flex-col m-2 py-2 w-10/12">
          <div className="md:w-8/12 bg-cover h-auto mb-4 w-full">
            {blog?.blogImage === undefined ? (
              ""
            ) : (
              <img
                src={`https://mernblog-backend-1.onrender.com${blog?.blogImage}`}
                alt="blogImage"
                className="rounded-xl md:w-auto md:h-auto"
              />
            )}
          </div>
          <div className="">
            <p className="m-auto">{blog?.content}</p>
          </div>
        </div>

        <div className="flex gap-5">
          <button onClick={handleToggle}>
            <FaCommentAlt />
          </button>
        </div>
      </div>

      {toggleComment && (
        <>
          <div className="md:w-8/12 flex flex-col gap-10 m-4 w-10/12 rounded-md text-white">
            Comments
          </div>
          <div className="md:w-8/12 flex flex-col gap-10 m-4 w-10/12 rounded-md">
            <CommentSection _id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostInfo;
