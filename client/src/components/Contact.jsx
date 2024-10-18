import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/user/getuser/${listing.userRef}`);
      const data = await response.json();
      //console.log("data is", data);
      setLandlord(data?.data);
    };
    fetchUser();
  }, [listing.userRef]);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {landlord && (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-medium text-gray-700">
            Contact{" "}
            <span className="text-gray-600 font-bold">{landlord.username}</span>{" "}
            regarding{" "}
            <span className="text-gray-600 font-bold capitalize">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder="Enter your message here..."
            value={message}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="inline-block w-full text-center py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
