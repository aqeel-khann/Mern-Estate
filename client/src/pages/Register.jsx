 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" })
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]:value})
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
     setLoading(true)
     const response = await fetch("/api/auth/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(user),
     });
      const data = await response.json();
      console.log(data);
      if (data.status===201) {
         alert(data.message);
         setLoading(false);
         navigate("/login");  
      }
      else {
        alert(data.message)
         setLoading(false);

      }
      
      
   } catch (error) {
    alert(error)
   }
    
    
    
  }
   return (
     <div className="flex items-center justify-center h-screen">
       <div className="p-6 max-w-lg w-full mx-auto border-2 border-slate-200">
         <h3 className="text-lg font-bold text-center mt-10 mb-5">
           Registration
         </h3>
         <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="text"
             placeholder="Username..."
             name="username"
             onChange={handleChange}
             value={user.username}
             required
           />
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="email"
             placeholder="Email..."
             name="email"
             onChange={handleChange}
             value={user.email}
             required
           />
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="password"
             placeholder="Password..."
             name="password"
             onChange={handleChange}
             value={user.password}
             required
           />
           <button className="p-2 w-32 bg-black text-white rounded-md hover:opacity-90">
            {loading? "Loading...": "Register"}
           </button>
           <OAuth/>
         </form>
         <div className="flex justify-center mt-4">
           <p className="mr-3">Have an account?</p>
           <Link to={"/login"}>
             <span className="font-bold underline hover:no-underline">
               Login
             </span>
           </Link>
         </div>
       </div>
     </div>
   );
 }

 export default Register;
