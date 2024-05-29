import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      }

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (data.status === "success") {
        toast.success(data.status);
        dispatch(login(data));
        navigate("/");
      }
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#11151c]">
      <div className=" flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-md w-80 h-auto md:max-w-md justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Login</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  Enter Email
                </label>
                <input
                  id="email"
                  className="p-2 focus:outline-none focus:outline-indigo-300  border-b-2 w-full"
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  Enter Password
                </label>
                <input
                  id="password"
                  className="p-2 focus:outline-none focus:outline-indigo-300  border-b-2 w-full"
                  type="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#6ac6ed] to-[#df2ffafa] p-2 text-white rounded-full w-full"
              >
                Login
              </button>
              <p className="text-center mt-2 text-red-500">{errorMessage}</p>
              <div className="flex">
                <p className="mr-2">Don't have an account ?</p>
                <Link to="/signup">
                  <span className="text-blue-600">register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
