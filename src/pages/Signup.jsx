import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";

const Register = () => {
  const registerForm = useRef(null);
  const { registerUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password1 !== password2) {
      alert("Passwords did not match!");
      return;
    }

    const userInfo = { name, email, password1, password2 };

    registerUser(userInfo);
  };

  return (
    <div className="flex justify-center sm:p-28 items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Register
        </h1>
        <form
          ref={registerForm}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="name">
              Name:
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="password1">
              Password:
            </label>
            <input
              required
              type="password"
              name="password1"
              placeholder="Enter password..."
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2" htmlFor="password2">
              Confirm Password:
            </label>
            <input
              required
              type="password"
              name="password2"
              placeholder="Confirm password..."
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Register"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition"
            />
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
