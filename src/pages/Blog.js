import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import useBlog from "../hooks/useBlog";
import useGetMyProfile from "../hooks/useGetMyProfile";

const Blog = () => {
  useBlog();
  useGetMyProfile();

  const blogs = useSelector((store) => store.blogs);

  if (!blogs) return null;

  return (
    <div className="text-white flex flex-col justify-center items-center pt-5 px-10">
      <div className="border-b-2 border-black">Trending blogs</div>
      <div className="flex m-2 flex-wrap sm:flex gap-8 my-4">
        {blogs?.blog?.data?.posts?.length === 0 ? (
          <div>No posts to display.</div>
        ) : (
          blogs?.blog?.data?.posts?.map((post) => (
            <PostCard key={post._id} {...post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
