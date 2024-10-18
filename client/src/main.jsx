import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing.jsx';
import UpdateListing from './pages/UpdateListing.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';

 const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
     children: [
       {
         path: "/",
         element: <Home />,
       },
       {
         path: "/About",
         element: <About />,
       },
       {
         path: "/login",
         element: <Login />,
       },
       {
         path: "/register",
         element: <Register />,
       },
       {
         path: "/listing/:id",
         element: <Listing />,
       },
       {
         path: "/search",
         element: <Search/>,
       },
       {
         path: "/profile",
         element: (
           <PrivateRoute>
             <Profile />
           </PrivateRoute>
         ), // Protect the profile route
       },  
       {
         path: "/create-listing",
         element: (
           <PrivateRoute>
             <CreateListing/>
           </PrivateRoute>
         ),  
       },
       {
         path: "/update-listing/:id",
         element: (
           <PrivateRoute>
             <UpdateListing/>
           </PrivateRoute>
         ),  
       },
     ],
   },
 ]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>)
