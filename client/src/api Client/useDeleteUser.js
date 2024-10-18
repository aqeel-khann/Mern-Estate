import { useDispatch } from "react-redux";
import { userReset } from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();  

      if (data.status === 200) {
        dispatch(userReset());
        alert(data.message);
        navigate("/register");
      }
    } catch (error) {
      alert("Error while Deleting User");
      console.error(error);
    }
  };

  return { deleteUser };
};
