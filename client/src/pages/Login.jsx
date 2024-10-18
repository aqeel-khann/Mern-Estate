import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import { userInFailure, userInStart, userInSuccess } from '../store/slice/userSlice';
import OAuth from '../components/OAuth';

function Login() {
  const [input, setInput] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading}=useSelector((state)=>state?.user)
  
  const handleChange = (e) => {
   let name=e.target.name;
    let value= e.target.value;
    setInput({...input, [name]: value})
  }
  
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
      dispatch(userInStart())
     const response = await fetch("/api/auth/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(input),
     });
     const data = await response.json();
     //console.log(data);

     alert(data.message);
     dispatch(userInFailure())
     if (response.ok && data.message === "User Login Successfully") {
       dispatch(userInSuccess(data))
       navigate("/");
     }
   } catch (error) {
     alert(error);
   }
 };

  
  return (
    <div
      className="flex items-center justify-center h-screen
    "
    >
      <div className="p-6 max-w-lg w-full mx-auto border-2 border-slate-200">
        <h3 className="text-lg font-bold text-center mt-10 mb-5">Login</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <input
            className="p-2 rounded-lg w-2/3 border-2 mb-6"
            type="email"
            placeholder="Email..."
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded-lg w-2/3 border-2 mb-6"
            type="password"
            name="password"
            value={input.password}
            placeholder="Password..."
            onChange={handleChange}
          />
          <button className="p-2 w-32 bg-black text-white rounded-md hover:opacity-90">
            {loading ? "Loading..." : "Login"}
          </button>
          <OAuth/>
        </form>
        <div className="flex justify-center mt-4">
          <p className="mr-3">Don't Have an account?</p>
          <Link to={"/register"}>
            <span className="font-bold underline hover:no-underline">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login

 