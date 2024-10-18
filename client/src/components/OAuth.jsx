import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import {userInSuccess} from "../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

 
function OAuth() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            //console.log(result.user);
            const response = await fetch("api/auth/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: result.user.email,
                name: result.user.displayName,
                avatar: result.user.photoURL,
              }),
            });
            const data = await response.json()
            console.log("oauth is",data);
            
            dispatch(userInSuccess(data))
            alert("Login successfully")
            navigate('/')
            //console.log("data is" ,data);
            
            
            
        } catch (error) {
            console.log("Could not sign in Google");
        }
        
    }
  return (
      <div>
          <button className="bg-slate-300 shadow-lg p-2 m-2 hover:opacity-80"  onClick={handleGoogleClick} type='button'>Continue With Google</button>
    </div>
  )
}

export default OAuth