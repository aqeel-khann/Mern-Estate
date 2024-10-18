import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorSection7 from "../components/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function Listing() {
  const [listing, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact,setContact]=useState(false)
  const currentUser = useSelector((state) => state?.user?.user?.currentUser);
  const userId = currentUser?.data?._id || currentUser?._id;
  //console.log("from listing",userId);
  
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(`/api/listing/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setError(true);
          setLoading(false);
          throw new Error("Failed to fetch listing");
        } else {
          const data = await response.json();
            setListings(data?.data);
            console.log(data?.data);
            
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  return (
    <main>
      {loading && <Spinner />}
      {error && <ErrorSection7 />}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation modules={[Navigation]}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-2xl font-semibold">
          {listing?.name} - ${" "}
          {listing?.offer
            ? listing?.discountPrice.toLocaleString("en-US")
            : listing?.regularPrice.toLocaleString("en-US")}
          {listing?.type === "rent" && " / month"}
        </p>
        <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {listing?.address}
        </p>
        <div className="flex gap-4">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            {listing?.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing?.offer && (
            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              ${+listing.regularPrice - +listing.discountPrice} OFF
            </p>
          )}
        </div>
        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing?.description}
        </p>
        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBed className="text-lg" />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} beds `
              : `${listing?.bedrooms} bed `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg" />
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} baths `
              : `${listing?.bathrooms} bath `}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaParking className="text-lg" />
            {listing?.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaChair className="text-lg" />
            {listing?.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>

        {currentUser && listing?.userRef !==userId && !contact &&
            
              <button onClick={()=>setContact(true)} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                Contact landlord
              </button>
              }
              
              {
                  contact && <Contact listing={ listing} />
              }
      </div>
    </main>
  );
}

export default Listing;
