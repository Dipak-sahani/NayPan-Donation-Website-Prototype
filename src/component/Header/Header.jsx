import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsSidebarOpen(!isSidebarOpen);
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to apply active class based on route matching
  const getActiveClass = ({ isActive }) => {
    return isActive
      ? "bg-blue-800 text-lg py-2 font-bold px-4 rounded-lg hover:bg-gray-700 transition text-orange-500 glow-effect flex"
      : "text-white text-lg py-2 px-4 rounded-lg hover:bg-gray-700 transition flex";
  };

  return (
    <div className="relative">
      {/* Header */}
      <header className="bg-gray-700 shadow-md py-4 px-6 sm:px-2 w-full fixed top-0 left-0 z-40 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition"
        >
          LOGO
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          {user && <span className="text-white text-lg">{user.username}</span>}
          <button
            onClick={toggleSidebar}
            className=" transition md:hidden"
          >
            <img src="/9118377_three_line_horizontal_icon.png" alt="three" className="w-16 h-16 p-1"/> <span className="px-2"/>
          </button>
          {user ? (
            <Link
              to="/profile"
              className="hidden md:block bg-gray-200 text-lg px-4 py-2  hover:bg-green-600 transition"
            >
              <h1>{user.name}</h1>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block bg-green-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:block bg-green-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 sm:mt-0 mt-14 h-full w-64  bg-gray-800 text-white shadow-lg z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="bg-blue-600 py-4 px-6">
            <Link
              to="/"
              className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition"
            >
              LOGO
            </Link>
          </div>

          {/* Links */}
          
          <nav className="flex flex-col mt-4 space-y-2 px-4">
          {user&&<>
            <NavLink
              to="/"
              className={getActiveClass}
              onClick={toggleSidebar}
            >
             <img src="/monitor_dashboard_icon_136391.png" alt="dashboard logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">Dashboard</span> 
            </NavLink>
            <NavLink
              to="/transaction"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              <img src="/2921795_banking_business_credit card_e-commerce_payment_icon.png" alt="tran logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">Transaction</span> 
            </NavLink>
          
          </>}
            
            <NavLink
              to="/faq"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              <img src="/7324087_ui_interface_question_help_faq_icon.png" alt="faq logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">FAQ</span> 
            </NavLink>
            <NavLink
              to="/learningModule"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              <img src="/3586373_book_learning_school_icon.png" alt="learn logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">Learning Module</span> 
            </NavLink>
            <NavLink
              to="/reward"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              <img src="/392494_award_badge_best_bookmark_favorite_icon.png" alt="reward logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">Reward</span> 
            </NavLink>
            {
              user&&
              <NavLink
              to="/feedback"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              <img src="/185079_bubble_comment_talk_icon.png" alt="feed logo"  className="w-8 h-8 p-1 bg-gray-500 rounded-xl"/> <span className="px-2">Feedback</span> 
            </NavLink>
            }
            
            <NavLink
              to="/donate"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              Donate Now!
            </NavLink>
            {
              !user&&
              <NavLink
              to="/login"
              onClick={toggleSidebar}
              className={getActiveClass}
            >
              Login
            </NavLink>
            }
            {user && (
          <div className="mt-auto px-4 py-2 flex justify-center">
            <button
              onClick={handleLogout}
              className=" text-white rounded-2 border-2 border-gray-700 px-4 py-2 rounded-lg hover:text-red-600 hover:border-gray-800 transition w-full"
            >
              Logout
            </button>
          </div>
        )}
          </nav>
          {/* Logout Button - Positioned at the bottom */}
        
        </div>

        
      </aside>

      {/* Content Wrapper */}
    </div>
  );
};

export default Header;
