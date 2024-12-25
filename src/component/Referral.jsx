import React, { useState } from 'react';
import { Databases ,ID} from 'appwrite';
import { useAuth } from "../utils/AuthContext.jsx";
import conf from '../conf/conf.js';
import client from '../appwrite/appwrite.js'

const databases = new Databases(client);

const ReferralButton = () => {
  const { user } = useAuth(); // Fetch user from AuthContext
  const [referralLink, setReferralLink] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReferralCode = () => {
    // Simple logic to generate a random referral code
    return user.name+Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const copylinkhandler=()=>{
    navigator.clipboard.writeText(referralLink)
    alert("Link Copied")
  }

  const handleGenerateReferralLink = async () => {
    setLoading(true);
    try {
      const referralCode = generateReferralCode();

      // Store the referral code in the database
      await databases.createDocument(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteReferralCodeCollectionId, // Your collection ID
        ID.unique(),
        {
            "referral_user_id": user.$id, // Use user ID from AuthContext
            "referral_code": referralCode,
        }
      );

      // Create the referral link
      const link = `${window.location.origin}/donate?referral=${referralCode}`;
      setReferralLink(link);
      alert('Referral Code generated successfully!');
    } catch (error) {
      console.error('Error generating referral link:', error);
      alert('Failed to generate referral Code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGenerateReferralLink}
        disabled={loading}
        className={`px-4 py-2 text-white rounded-md ${
          loading ? 'bg-gray-500' : 'bg-green-700 hover:bg-green-600'
        }`}
      >
        {loading ? 'Generating...' : 'Generate Referral Link'}
      </button>

      {referralLink && (
        <div className="mt-4">
          <p className="text-gray-700">Your Referral Link:</p>
          <input
            type="text"
            value={referralLink}
            readOnly
            className="border px-2 py-1 rounded-md w-full mt-2"
          />
          <button
            onClick={copylinkhandler}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ReferralButton;
