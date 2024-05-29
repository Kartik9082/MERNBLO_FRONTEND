import React from "react";
import useGetUser from "../hooks/useGetUser";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { id } = useParams();

  useGetUser({ id });
  const user = useSelector((store) => store?.user?.getUser);
  console.log(user);

  return (
    <div className="min-h-[90vh] flex bg-[#11151c] text-white">
      <div className="flex flex-wrap  md:flex  md:justify-center items-center w-full">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-80 h-80 rounded-full mr-4 object-cover overflow-hidden "
            src={`https://mernblog-backend-1.onrender.com${user?.data?.user?.photo} `} // Use the profileImage variable here
            alt="User"
            onError={(e) => console.error("Error loading image:", e)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-white mx-2  ">
            {user?.data?.user?.name}
          </h1>
          <p className="text-gray-200 text-sm mb-4 mx-2">
            {user?.data?.user?.role}
          </p>
          <p className="text-sm m-2 py-2">
            <span className="font-semibold">Email:</span>{" "}
            {user?.data?.user?.email}
          </p>
          <p className="text-sm m-2 py-2">
            <span className="font-semibold">Bio:</span> {user?.data?.user?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
