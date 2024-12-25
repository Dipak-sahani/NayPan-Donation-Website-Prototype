import React from "react";
import { useAuth } from "../utils/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useAuth(); // Assuming user data is provided by AuthContext

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl font-bold text-blue-800 text-center mb-4">
          Profile
        </h1>
        {user ? (
          <>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700 text-lg mt-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </>
        ) : (
          <p className="text-gray-700 text-center">
            Unable to fetch user data. Please try again later.
          </p>
        )}
        <hr className="my-4" />
        <p className="text-center text-gray-500">
          More features are coming soon!
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
