import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userReset } from "../store/slice/userSlice";

export const useLogOutUser = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();
    
    
    const logout = async() => {
       try {
         const response = await fetch("/api/auth/logout", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
         });
         const data = await response.json();
         if (response.status === 200) {
           dispatch(userReset());
           alert(data.message);
           navigate("/register");
         }
       } catch (error) {
         alert("Error while LogOut User");
         console.error(error);
       }
     
    }
    return {logout}
}