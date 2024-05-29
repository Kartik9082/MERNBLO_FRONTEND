import React, { useState } from "react";
import useGetMyProfile from "../hooks/useGetMyProfile";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";
import { logout } from "../redux/userSlice";

const Profile = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const token = useSelector((store) => store?.user?.userData?.token);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axios.patch(
        `${USER_API_ENDPOINT}/deleteMe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      window.location.href = "/";
      dispatch(logout());
      toast.success("You'r Account deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useGetMyProfile();
  const user = useSelector((store) => store?.user);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const profileImage = user?.getCurrentUser?.data?.user?.photo;
  return (
    <div className="min-h-[90vh] flex bg-[#11151c] text-white">
      <div className="flex flex-wrap  md:flex  md:justify-center items-center w-full">
        <div className="w-full md:w-1/2 flex justify-center mt-2">
          <img
            className="w-80 h-80 rounded-full mr-4 object-cover overflow-hidden "
            src={`https://mernblog-backend-1.onrender.com${profileImage}`} // Use the profileImage variable here
            alt="User"
            onError={(e) => console.error("Error loading image:", e)}
          />
        </div>
        <div className=" w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-white mx-2  ">
            {user?.getCurrentUser?.data?.user?.name}
          </h1>
          <p
            className={
              user?.getCurrentUser?.data?.user?.role === "user"
                ? "text-green-500 text-sm mb-4 mx-2"
                : "text-orange-500 text-sm mb-4 mx-2"
            }
          >
            {user?.getCurrentUser?.data?.user?.role}
          </p>
          <p className="text-sm m-2 py-2">
            <span className="font-semibold">Email:</span>{" "}
            {user?.getCurrentUser?.data?.user?.email}
          </p>
          <p className="text-sm m-2 py-2">
            <span className="font-semibold">Bio:</span>{" "}
            {user?.getCurrentUser?.data?.user?.bio}
          </p>
          <Link to="/edit">
            <button className="bg-black text-white font-bold p-2 rounded mt-2 mx-2 text-xs mb-2">
              Edit Details
            </button>
          </Link>
          <button
            className="bg-black text-white font-bold p-2 rounded mt-2 mx-2 text-xs mb-2"
            onClick={() => setModalDelete(true)}
          >
            Delete
          </button>

          {modalDelete ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-80 h-60 md:w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold text-black">
                        Delete Account
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setModalDelete(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-black">
                        Are you sure you want to delete your account? This
                        action cannot be undone.
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalDelete(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
