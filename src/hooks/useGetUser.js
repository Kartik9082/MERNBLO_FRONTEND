import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constants";
import { getUser } from "../redux/userSlice";

const useGetUser = ({ id }) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.user?.userData?.token);
  console.log(id);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!id) {
        console.error("User ID is undefined");
        return;
      }

      try {
        const response = await axios.get(`${USER_API_ENDPOINT}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(getUser(response.data));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, [id, dispatch, token]);
};

export default useGetUser;
