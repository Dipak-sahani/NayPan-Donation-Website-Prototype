import React, { useState } from "react";
import { Databases, Query } from "appwrite";
import { useAuth } from "../utils/AuthContext.jsx";
import conf from "../conf/conf.js";
import client from "../appwrite/appwrite.js";
const ReferralCode = () => {

  const {referralInfo} = useAuth()

  const { user } = useAuth(); // Get current user from context
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [referralLin, setReferralLin] = useState('');
  const databases = new Databases(client);
  
  const oncopylinkhandler=()=>{
    navigator.clipboard.writeText(referralLin)
    alert("Link Copied !")
}

    const oncopycodehandler=()=>{
        navigator.clipboard.writeText(referralCode)
        alert("referral Code Copied")
    }
  const handleFetchReferralCode = async () => {
    if (!user?.$id) {
        console.log(user.$id);
        
      alert("Please log in to generate a referral code.");
      return;
    }
    
    setLoading(true);
    try {
      // Fetch the most recent referral code for the user
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteReferralCodeCollectionId, // Your collection ID
        [Query.equal("referral_user_id", user.$id)] // Fetch documents where userId matches
      );


      if (response.total > 0) {
        // Show the latest referral code
        const latestReferral = response.documents[0].referral_code;
        setReferralCode(latestReferral);
        const referralCode =response.documents[0].referral_code
        
        
        referralInfo(referralCode)
        const link = `${window.location.origin}/donate?referral=${latestReferral}`;
        setReferralLin(link);
      } else {
        setReferralCode("No referral code found. Please generate one.");
      }
    } catch (error) {
      setError("Failed to fetch referral code.");
      console.error("Error fetching referral code:", error);
    } finally {
      setLoading(false);
    }

    
    if (referralCode) {
    const link = `${window.location.origin}/donate?referral=${referralCode}`;
    setReferralLin(link);
    }
  
  };

  return (
    <div className="p-4">
      <button
        onClick={handleFetchReferralCode}
        disabled={loading}
        className={`px-4 py-2 text-white rounded-md ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Fetching..." : "Fetch Referral Code"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {referralCode && (<>
        
        <div className="mt-4 flex">
        
        <input
          type="text"
          value={referralCode}
          readOnly
          className="border px-2 py-1 rounded-md w-full mt-2"
        />
        <button
          onClick={oncopycodehandler}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Copy Code
        </button>
      </div>
      <div className="mt-4 flex" >
        
        <input
          type="text"
          value={referralLin}
          readOnly
          className="border px-2 py-1 rounded-md w-full mt-2"
        />
        <button
          onClick={oncopylinkhandler}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Copy Link
        </button>
      </div>
      </>
      )}
    </div>
  );
};

export default ReferralCode;
