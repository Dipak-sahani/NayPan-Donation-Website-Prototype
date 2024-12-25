import React from "react";

const LearningModule = () => {
  const topics = [
    {
      title: "How to Donate Effectively?",
      content: `
        - Understand the needs: Research the causes or people you wish to help.
        - Choose what to donate: Items like food, clothes, and money are common, but time and skills are also valuable.
        - Work with local organizations: Partnering with trusted groups ensures your donations are distributed efficiently.`,
    },
    {
      title: "Safety Tips for Donating",
      content: `
        - Verify the organization: Check credentials and reviews of charities or NGOs.
        - Avoid scams: Be cautious of unsolicited donation requests or offers that seem too good to be true.
        - Use secure methods: When donating online, ensure the website is secure (look for HTTPS) and avoid sharing sensitive information.`,
    },
    {
      title: "Trusted Organizations for Donations",
      content: `
        - International NGOs: UNICEF, Red Cross, World Food Programme.
        - Local charities: Food banks, community centers, and religious institutions.
        - Crowdfunding platforms: Use reputable platforms like GoFundMe or Ketto for verified campaigns.`,
    },
    {
      title: "Different Ways to Donate",
      content: `
        - Financial Donations: Contribute directly through trusted channels.
        - In-Kind Donations: Provide food, clothes, books, or hygiene products.
        - Volunteering: Offer your time and skills to help with events, teaching, or distribution.
        - Organizing Drives: Start a donation drive for specific causes like winter clothes or school supplies.`,
    },
    {
      title: "How to Start Your Own Initiative?",
      content: `
        - Identify a Cause: Focus on issues like hunger, education, or health.
        - Create Awareness: Use social media or local events to gather support.
        - Build Partnerships: Collaborate with other organizations or businesses.
        - Monitor Impact: Ensure donations reach the intended beneficiaries and document the outcomes.`,
    },
  ];

  return (
    <div className="p-6 sm:mt-0 mt-36 sm:ml-64 ml-0  pt-34 sm:pt-20 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        Learning Module: Safe and Effective Donations
      </h1>
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={index} className="p-4 bg-white shadow-md border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">{topic.title}</h2>
            <p className="mt-4 text-gray-700 whitespace-pre-line">{topic.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModule;
