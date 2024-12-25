import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import conf from "../conf/conf.js";
import client from "../appwrite/appwrite.js";
import { Databases ,ID} from 'appwrite';

const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError]=useState('')
    const databases = new Databases(client);

    function generateUniqueCode() {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomValue = Math.floor(Math.random() * 1000); // Random number between 0 and 999
      return `${timestamp}-${randomValue}`;
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    referralCode: null, // Default referral code is null
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Extract referral code from URL query parameters
    const referralCode = searchParams.get("referral");
    if (referralCode) {
      setFormData((prev) => ({ ...prev, referralCode }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send payment details to the backend
      // const response = await fetch("/create-order", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     amount: formData.amount,
      //     referralCode: formData.referralCode, // Include referral code
      //   }),
      // });

      // const { id: order_id, amount } = await response.json();

      // // Open Razorpay Checkout
      // const options = {
      //   key: "YOUR_PUBLIC_KEY", // Replace with your Razorpay public key
      //   amount,
      //   currency: "INR",
      //   name: formData.name,
      //   description: "Payment for services",
      //   order_id,
      //   handler: function (response) {
      //     alert("Payment Successful");
      //     console.log(response);
      //   },
      //   prefill: {
      //     name: formData.name,
      //     email: formData.email,
      //   },
      //   theme: {
      //     color: "#3b82f6", // Tailwind Blue 500
      //   },
      // };

      // const razorpay = new window.Razorpay(options);
      // razorpay.open();

      setLoading(true);
    try {
      // Fetch the most recent referral code for the user
      await databases.createDocument(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteTransactionCollection, // Your collection ID
        ID.unique(),
        {
            "referral_id": formData.referralCode, // Use user ID from AuthContext
            "donar_name": formData.name,
            "donar_email_id":formData.email,
            "order_id":generateUniqueCode(),
            "amount":parseFloat(`${formData.amount}`)
        }
      );

     alert(`Thank's You for Donating ${formData.amount} `)
    } catch (error) {
      alert("Failed to transaction ");
      setError(error)
      console.error("Error fetching :", error);
    } finally {
      setLoading(false);
    }

    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className="p-6 sm:mt-0 mt-36 ml-0 sm:ml-72 pt-34 sm:pt-20 max-w-4xl mx-auto content-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
      <p className="text-red-700"> This form does not process actual payments, this website is solely a prototype for the project.</p>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Payment Form
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600"
          >
            Amount (in INR)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {formData.referralCode ? (
          <div className="mb-4">
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium text-gray-600"
            >
              Referral Code
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              readOnly
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium text-gray-600"
            >
              Referral Code
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 "
            />
          </div>
        )}

        <p className="text-red-500" >{error}</p>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
