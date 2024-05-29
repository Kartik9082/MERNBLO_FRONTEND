import { Link } from "react-router-dom";
import Blog from "../pages/Blog";
import { IoCreate } from "react-icons/io5";

const Home = () => {
  return (
    <div className="bg-[#11151c] text-white flex flex-col  justify-center items-center pt-5 px-10 h-auto">
      <h1 className="text-wrap text-2xl md:text-5xl flex justify-center m-4">
        Welcome to the MERN BLOG Explore the world of blogs,
      </h1>
      <Blog />
      <Link to="/create">
        <div className="md:hidden lg:hidden xl:hidden fixed bottom-6 right-0  text-white p-4 ">
          <IoCreate size={50} />
        </div>
      </Link>
    </div>
  );
};

export default Home;
