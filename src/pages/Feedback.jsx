import React, { useState, useEffect } from "react";
import { Databases, Query } from "appwrite";
import client from "../appwrite/appwrite.js"; // Your Appwrite client
import conf from "../conf/conf.js";
import { useAuth } from "../utils/AuthContext.jsx";

const databases = new Databases(client);

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Assuming `user` contains the logged-in user's details

  const databaseId = conf.appwriteDatabaseId;
  const collectionId = conf.appwriteFeedbackCollectionId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);

      // Save feedback in Appwrite
      const response = await databases.createDocument(databaseId, collectionId, "unique()", {
        feedback: feedback,
        user_id: user.$id, // Associate the feedback with the user's ID
      });

      console.log("Feedback submitted:", response);
      alert("Feedback submitted successfully!");
      setFeedback("");

      // Refresh feedback after submission
      fetchUserFeedbacks();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFeedbacks = async () => {
    try {
      setError(null);
      setLoading(true);

      // Fetch feedback belonging only to the logged-in user
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("user_id", user.$id),
      ]);

      setUserFeedbacks(response.documents);
    } catch (err) {
      console.error("Error fetching user feedbacks:", err);
      setError("Failed to fetch your feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.$id) {
      fetchUserFeedbacks();
    }
  }, [user]);

  return (
    <div className="p-6 ml-0 sm:mt-0 mt-36 sm:ml-64 pt-34 sm:pt-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        Feedback Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <hr className="my-8" />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Feedback</h2>
      {loading && <p>Loading your feedback...</p>}
      {!loading && userFeedbacks.length === 0 && (
        <p>You haven't submitted any feedback yet.</p>
      )}
      <div className="space-y-4">
        {userFeedbacks.map((item) => (
          <div
            key={item.$id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
          >
            <p className="text-gray-700">{item.feedback}</p>
            <p className="text-gray-500 text-sm mt-2">
              Submitted on:{" "}
              <span className="font-semibold">
                {item.$createdAt.slice(0, 10)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
