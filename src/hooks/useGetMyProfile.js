import { useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constants";
import { getCurrentUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetMyProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.user?.userData?.token);

  useEffect(() => {
    const getMyProfile = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const data = res.data;
        dispatch(getCurrentUser(data));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getMyProfile();
  }, [dispatch, token]);
};

export default useGetMyProfile;
