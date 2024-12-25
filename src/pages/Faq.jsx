import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is poverty, and how does it affect people?",
      answer:
        "Poverty is the state of not having enough material possessions or income to meet basic needs, such as food, clothing, and shelter. It affects people by limiting access to education, healthcare, and employment opportunities, perpetuating a cycle of hardship.",
    },
    {
      question: "Who are beggars, and why do they beg?",
      answer:
        "Beggars are individuals who ask for money, food, or other necessities, often because they lack stable income or support. Reasons for begging include unemployment, homelessness, disabilities, and lack of social safety nets.",
    },
    {
      question: "How can I donate necessities to help the poor and beggars?",
      answer:
        "You can donate necessities through local charities, NGOs, or community organizations that work with the underprivileged. Additionally, you can provide food, clothing, or hygiene kits directly to those in need in your community.",
    },
    {
      question: "Are there organizations that help beggars and the poor?",
      answer:
        "Yes, many organizations work to uplift the underprivileged by providing food, shelter, education, and job opportunities. Examples include food banks, shelters, and global NGOs like UNICEF and Red Cross.",
    },
    {
      question: "Is giving money to beggars the best way to help them?",
      answer:
        "While giving money can provide immediate relief, it’s often more impactful to donate to organizations that address root causes of poverty or provide resources like food, clothing, or job training.",
    },
    {
      question: "How can I start a donation drive for the poor?",
      answer:
        "To start a donation drive, identify a specific need (e.g., food, clothing, or school supplies), promote the drive in your community or online, and partner with local organizations to distribute the donations effectively.",
    },
  ];

  return (
    <div className="p-6 ml-0 sm:ml-64 sm:mt-0 mt-36 pt-34 sm:pt-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
