import React, { useState, useEffect } from "react";
import { Databases, Query } from "appwrite";
import client from "../appwrite/appwrite.js"; // Import your Appwrite client
import conf from "../conf/conf.js";
import { useAuth } from "../utils/AuthContext.jsx";
import ReferralCode from "../component/FetchReferralCode.jsx";

const databases = new Databases(client);

const Transactions = () => {
  const { referral_code } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual database and collection ID
      const databaseId = conf.appwriteDatabaseId;
      const collectionId = conf.appwriteTransactionCollection;

      // Query the database for transactions matching the referral code
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("referral_id", referral_code),
      ]);
      console.log(response);

      setTransactions(response.documents);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (referral_code) {
      fetchTransactions();
    }
  }, [referral_code]);

  // Calculate total amount
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="p-4 pt-36 sm:pt-20 ml-0 sm:ml-60">
      
      <ReferralCode />
      <h2 className="text-lg font-bold">
        Transactions for Referral Code: {referral_code}
      </h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && transactions.length === 0 && (
        <p>No transactions found for this referral code.</p>
      )}
      {!loading && !error && transactions.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Donor Name</th>
                <th className="border border-gray-300 px-4 py-2">Donor Email</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.$id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.order_id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rupees {transaction.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.$createdAt.slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.donar_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.donar_email_id}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-300 px-4 py-2" colSpan="1">
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Rupees {totalAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2" colSpan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
