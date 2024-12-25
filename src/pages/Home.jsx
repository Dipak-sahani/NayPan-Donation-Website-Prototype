import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext"; // Import the custom hook
import { Link } from "react-router-dom";
import ReferralButton from "../component/Referral.jsx"
import ReferralCode from "../component/FetchReferralCode.jsx"

const Home = () => {
  const { user } = useAuth(); // Access user data from AuthContext
  const {showcreatbutton}=useAuth()
  const [hidebutton, setHidebutton]=useState(false)

  const handleshowbutt=()=>{
    
    setHidebutton(true)
  }



  return (
    <div
      className={`mt-16 ${
        user ? "ml-0 sm:ml-0" : "ml-0"
      } md:ml-64 transition-all duration-300 `}
    >
      
      {user ? (
        <div className="bg-white shadow-md  rounded-lg">
          
          
         
         
    <div className="relative mt-24 sm:mt-0 w-full sm:h-screen h-auto bg-gray-800 text-white">
      {/* Background Image */}
      <img
        src="/PoorveImage.jpg" // Replace with your image URL
        alt="Background"
        className="absolute inset-0 sm:w-full  h-full object-cover z-0 bg-gray-200"
      />

      {/* Overlay */}
      
      <div className="absolute inset-0 bg-black bg-opacity-75 z-10"></div>
      {/* Text Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center p-6">
        <h1 className="text-4xl font-semibold pb-4 text-orange-500">Hello, {user.name}</h1>
        <h1 className="text-xl font-bold mb-4">Welcome to Our NayePan Portal</h1>
        <p className="text-lg mb-4 italic">
          Initial push is the toughest! Go through the learning modules, or reach out to your fundraising manager to level up.
        </p>
        <img src="/8725438_arrow_circle_down_icon.png" alt="down arrow" className="h-16 w-16 mt-10 animate-bounce " />
      </div>
    </div>
        <div className=" bg-gray-200" >
          { hidebutton&&<>
            {
            !showcreatbutton && <ReferralButton/>
          }
          </>
          
        }
        <div onClick={handleshowbutt}>
        <ReferralCode ></ReferralCode>

        </div>
        </div>
        


        </div>
      ) : (
        <p className="text-gray-700">You are not logged in.</p>
      )}
    </div>

    
  );
};

export default Home;
