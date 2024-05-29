import React from "react";
import { useSelector } from "react-redux";

const CommentList = () => {
  const comments = useSelector(
    (store) => store?.blogs?.singleBlog?.data?.post?.comments
  );

  return (
    <>
      <div className="w-full bg-[#111111] p-2  overflow-y-scroll no-scrollbar">
        {comments && comments?.length > 0 ? (
          comments.map((comment) => (
            <ul className="flex " key={comment?._id}>
              <li className="text-sm w-full text-white mb-2 bg-[#454545] p-4 rounded-lg">
                <span
                  className={
                    comment?.user?.name
                      ? "mx-2 font-medium text-yellow-500 "
                      : "mx-2 font-medium text-red-500 "
                  }
                >
                  {comment?.user?.name ? comment?.user?.name : "Deleted user"}{" "}
                </span>
                {">  "}
                <span className="text-xs font-normal">{comment?.comment}</span>
              </li>
            </ul>
          ))
        ) : (
          <div className="w-full flex justify-center text-center h-40 font-semibold text-xl text-white">
            No comments yet
          </div>
        )}
      </div>
    </>
  );
};

export default CommentList;
