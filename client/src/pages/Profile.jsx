 import React, { useState, useRef, useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
 } from "firebase/storage";
 import { app } from "../firebase";
 import { userInFailure, userInSuccess } from "../store/slice/userSlice";
 import { useNavigate } from "react-router-dom";
 import { useDeleteUser } from "../api Client/useDeleteUser";
 import { useLogOutUser } from "../api Client/useLogOutUser";
 import { Link } from "react-router-dom";
 import { useGetUserListing } from "../api Client/useGetListing";
 import { useDeleteListing } from "../api Client/useDeleteListing";

 function Profile() {
   const [file, setFile] = useState(undefined);
   const [filePercentage, setFilePercentage] = useState(0);
   const [fileUploadError, setFileUploadError] = useState(false);
   const [formData, setFormData] = useState({});
   const [listing, setListing] = useState([]);
   const [showListings, setShowListings] = useState(false); // Toggle for showing listings

   const navigate = useNavigate();
   const { deleteUser } = useDeleteUser();
   const { logout } = useLogOutUser();
   const { userListings } = useGetUserListing();
   const { deleteList } = useDeleteListing();
   const fileRef = useRef(null);
   const currentUser = useSelector(
     (state) => state?.user?.user?.currentUser?.data
   );
   const id = currentUser._id;
   const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.user);

   useEffect(() => {
     if (file) {
       handleFileUpload(file);
     }
   }, [file]);

   // Handle file upload
   const handleFileUpload = (file) => {
     const storage = getStorage(app);
     const fileName = new Date().getTime() + file.name;
     const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on(
       "state_changed",
       (snapshot) => {
         const progress =
           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setFilePercentage(Math.round(progress));
       },
       (error) => {
         setFileUploadError(true);
         console.error("Upload failed:", error);
       },
       () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
           setFormData((prevFormData) => ({
             ...prevFormData,
             avatar: downloadUrl,
           }));
         });
       }
     );
   };

   const handleChange = (e) => {
     const name = e.target.name;
     const value = e.target.value;
     setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch(`/api/user/update/${id}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       });
       const data = await response.json();
       if (data.status === 204) {
         dispatch(userInSuccess(data));
         alert("User updated successfully");
         navigate("/");
       } else {
         dispatch(userInFailure());
         alert(data.message);
       }
     } catch (error) {
       dispatch(userInFailure());
       alert(error.message);
     }
   };

   // Delete user
   const handleDeleteUser = (id) => {
     return deleteUser(id);
   };

   // Logout user
   const handleSignoutUser = () => {
     return logout();
   };

   // Show/Hide listings
   const handleShowListings = async () => {
     if (!showListings) {
       const response = await userListings(id);
       setListing(response?.data || []);
     }
     setShowListings((prev) => !prev); // Toggle the visibility
   };

   // Delete a listing
   const handleListDelete = async (listId) => {
     const response = await deleteList(listId);
     setListing((prev) =>
       prev.filter((list) => list._id !== response?.data?._id)
     );
   };

   return (
     <div className="flex items-center justify-center min-h-screen">
       <div className="p-6 max-w-lg w-full mx-auto border-2 border-slate-200 rounded-md shadow-md">
         <h3 className="text-lg font-bold text-center mt-10 mb-5">Profile</h3>
         <form
           onSubmit={handleSubmit}
           className="flex flex-col items-center justify-center"
         >
           <input
             onChange={(e) => setFile(e.target.files[0])}
             className="hidden"
             type="file"
             ref={fileRef}
             accept="image/*"
           />
           <img
             className="rounded-full h-24 w-24 object-cover cursor-pointer"
             src={formData.avatar || currentUser?.avatar}
             onClick={() => fileRef.current.click()}
             alt="profile"
           />
           <p>
             {fileUploadError ? (
               <span className="text-red-700 text-sm">
                 Error: image must be less than 2 Mb
               </span>
             ) : filePercentage > 0 && filePercentage < 100 ? (
               <span className="text-slate-700">
                 File uploading {filePercentage}%
               </span>
             ) : filePercentage === 100 ? (
               <span className="text-green-700">Image uploaded</span>
             ) : (
               ""
             )}
           </p>
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="username"
             placeholder="Username..."
             name="username"
             value={formData.username}
             onChange={handleChange}
             defaultValue={currentUser.username}
           />
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="email"
             placeholder="Email..."
             name="email"
             value={formData.email}
             onChange={handleChange}
             defaultValue={currentUser.email}
           />
           <input
             className="p-2 rounded-lg w-2/3 border-2 mb-6"
             type="password"
             name="password"
             value={formData.password}
             placeholder="Password..."
             onChange={handleChange}
           />
           <button className="p-2 w-32 bg-black text-white rounded-md hover:opacity-90">
             {loading ? "Loading..." : "Update"}
           </button>
           <Link
             className="p-2 w-32 bg-slate-500 mt-3 text-white rounded-md hover:opacity-90"
             to="/create-listing"
           >
             Create Listing
           </Link>
         </form>

         <div className="flex justify-between mt-4">
           <span
             onClick={() => handleDeleteUser(id)}
             className="font-bold underline hover:no-underline cursor-pointer"
           >
             Delete Account
           </span>
           <span
             onClick={handleSignoutUser}
             className="font-bold underline hover:no-underline cursor-pointer"
           >
             Logout
           </span>
         </div>

         <button
           onClick={handleShowListings}
           className="text-green-700 w-full mt-4 p-2 bg-gray-100 rounded-md"
         >
           {showListings ? "Hide Listings" : "Show Listings"}
         </button>

         {showListings && listing.length > 0 && (
           <div className="flex flex-col gap-4 mt-6">
             <h1 className="text-center text-2xl font-semibold">
               Your Listings
             </h1>
             {listing.map((list) => (
               <div
                 key={list._id}
                 className="border rounded-lg p-3 flex justify-between items-center gap-4 hover:shadow-lg transition-shadow"
               >
                 <Link to={`/listing/${list._id}`}>
                   <img
                     src={list.imageUrls[0]}
                     alt="listing cover"
                     className="h-16 w-16 object-contain"
                   />
                 </Link>
                 <Link
                   className="text-slate-700 font-semibold hover:underline truncate flex-1"
                   to={`/listing/${list._id}`}
                 >
                   <p>{list.name}</p>
                 </Link>
                 <div className="flex flex-col items-center">
                   <button
                     onClick={() => handleListDelete(list._id)}
                     className="text-red-700 uppercase"
                   >
                     Delete
                   </button>
                   <Link to={`/update-listing/${list._id}`}>
                     <button className="text-green-700 uppercase">Edit</button>
                   </Link>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   );
 }

 export default Profile;
