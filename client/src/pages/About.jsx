import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to Mern-Estate
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Your go-to platform for finding your dream property. Whether you're
          looking for a place to rent or a home to buy, we offer a seamless
          experience to help you find the perfect match.
        </p>
      </div>

      {/* Section: About Mern-Estate */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            About Mern-Estate
          </h2>
          <p className="text-lg text-gray-600">
            Mern-Estate is a real estate platform built with modern technologies
            to help users find and list properties with ease. From apartments to
            houses, and from urban cities to peaceful suburbs, Mern-Estate
            connects you to the best properties around the globe.
          </p>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg"
            alt="About Mern-Estate"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Section: Our Mission */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600">
          At Mern-Estate, our mission is to empower property seekers and
          landlords by providing a platform where trust, transparency, and
          innovation meet. We are committed to enhancing the real estate
          experience for both buyers and sellers.
        </p>
      </div>

     

      {/* Section: Call to Action */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Start your journey with Mern-Estate today and find your perfect
          property.
        </p>
        <Link to={"/search"}
           
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition"
        >
          Browse Listings
        </Link>
      </div>
    </div>
  );
}

export default About;
