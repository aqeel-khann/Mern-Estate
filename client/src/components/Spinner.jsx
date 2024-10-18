import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex justify-center items-center">
        {/* Outer Spinner Ring */}
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>

        {/* Pulsing Inner Dots */}
        <div className="absolute w-full h-full flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}
