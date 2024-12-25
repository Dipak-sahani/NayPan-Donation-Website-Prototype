import React from "react";

const RewardSystem = () => {
  const steps = [
    {
      title: "Step 1: Register and Login",
      description: `
        - Create an account on our platform to participate in the reward system.
        - Use your login credentials to access your personalized dashboard.`,
    },
    {
      title: "Step 2: Complete Activities",
      description: `
        - Participate in various activities such as donations, volunteering, and feedback submissions.
        - Each activity contributes points to your account.`,
    },
    {
      title: "Step 3: Earn Points",
      description: `
        - Points are awarded based on the type and impact of your activity.
        - Higher contributions lead to higher rewards.`,
    },
    {
      title: "Step 4: Redeem Rewards",
      description: `
        - Use your accumulated points to redeem rewards from our reward catalog.
        - Rewards include gift cards, certificates, and exclusive badges.`,
    },
    {
      title: "Step 5: Track Your Progress",
      description: `
        - View your current points and activities on your dashboard.
        - Set goals to earn specific rewards.`,
    },
  ];

  return (
    <div className="p-6 sm:mt-0 mt-36 ml-0 sm:ml-64 pt-34 sm:pt-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">
        How Our Reward System Works
      </h1>
      <p className="text-gray-700 text-lg mb-6 text-center">
        Participate in meaningful activities and earn exciting rewards while making a difference!
      </p>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="p-4 bg-white shadow-md border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">{step.title}</h2>
            <p className="mt-4 text-gray-700 whitespace-pre-line">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          Start Earning Rewards
        </button>
      </div>
    </div>
  );
};

export default RewardSystem;
