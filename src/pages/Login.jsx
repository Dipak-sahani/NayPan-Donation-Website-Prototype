import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const email = loginForm.current.email.value;
      const password = loginForm.current.password.value;
  
      const userInfo = { email, password };
  
      loginUser(userInfo);
    } catch (error) {
      console.log("Custom error"+error);
      
    }
  };

  return (
    <div className="flex justify-center items-center pt-16 sm:mt-44 ">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          ref={loginForm}
          className="space-y-6"
        >
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
            <label className="text-lg font-medium mb-2" htmlFor="password">
              Password:
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter password..."
              autoComplete="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition"
            />
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
