import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";

const EditProfile = () => {
  const user = useSelector((store) => store?.user);
  const { bio, email, name, photo } = user?.getCurrentUser?.data?.user;
  const token = useSelector((store) => store?.user?.userData?.token);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    photo: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ name, bio, email, photo });
  }, [name, bio, email, photo]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "photo") {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      data.append("email", formData.email);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const res = await axios.patch(`${USER_API_ENDPOINT}/updateMe`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = res.data;
      console.log("Response:", responseData);

      if (responseData.status !== "success") {
        setLoading(false);
        return setErrorMessage(responseData.message);
      }

      setLoading(false);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#11151c]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 m-0 md:w-full max-w-md my-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="photo">
            Photo
          </label>
          <input
            type="file"
            onChange={handleChange}
            id="photo"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            id="name"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-bold p-2 rounded mt-2 mx-2 text-xs mb-2 hover:bg-gray-600 transition delay-75 ease-in-out"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
