import React from "react";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

const CommentSection = ({ _id }) => {
  return (
    <div className="flex flex-col h-auto">
      <CreateComment _id={_id} />
      <CommentList />
    </div>
  );
};

export default CommentSection;
