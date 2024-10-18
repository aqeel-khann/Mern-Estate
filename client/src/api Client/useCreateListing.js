import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const useCreateList = () => {
    const currentUser = useSelector((state) => state?.user?.user?.currentUser);
    const userId = currentUser?.data?._id || currentUser?._id;
    const navigate=useNavigate()
    console.log("user id is ", userId);
    
    const creatList = async (formData) => {
        try {
            const response = await fetch("/api/listing/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({...formData,userRef:userId}),
            });
            const data = await response.json();
            console.log("data is",data);
            
            if (data.status === 201) {
                alert(data.message);
                navigate("/profile");
                
            }
        } catch (error) {
            alert("Error in Creating Listing", error)
            console.log(error.message);
            
        }
    }
    return {creatList}
}