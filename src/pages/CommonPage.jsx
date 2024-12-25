import React from "react";

const CommonPage = () => {
  return (
    <div className="relative ml-0 sm:ml-24 w-full h-screen bg-gray-800 text-white">
      {/* Background Image */}
      <img
        src="/PoorveImage.jpg" // Replace with your image URL
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center p-6">
        <h1 className="text-4xl font-semibold pb-4 text-orange-500">Hello,</h1>
        <h1 className="text-xl font-bold mb-4">Welcome to Our NayePan Portal</h1>
        <p className="text-lg mb-4 italic">
          Initial push is the toughest! Go through the learning modules, or
          reach out to your fundraising manager to level up.
        </p>
        <img
          src="/8725438_arrow_circle_down_icon.png"
          alt="down arrow"
          className="h-16 w-16 mt-10 animate-bounce"
        />
      </div>
    </div>
  );
};

export default CommonPage;
