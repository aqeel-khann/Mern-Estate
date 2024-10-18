import React from "react";
import { Link } from "react-router-dom";

function ErrorSection7() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-8">
      <div>
        {/* Error Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mx-auto text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>

        {/* Error Message */}
        <h1 className="mt-10 text-3xl font-bold text-gray-800 md:text-4xl">
          Error 404 <br /> It looks like something went wrong.
        </h1>

        {/* Subtext */}
        <p className="mt-8 mb-10 text-lg text-gray-500 max-w-md mx-auto">
          Don&apos;t worry, our team is already on it. Please try refreshing the
          page or come back later.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-block bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-900 transition-all"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorSection7;
