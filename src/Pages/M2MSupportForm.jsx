import React, { useState } from "react";

// Sample JSON (replace with API or import)
const supportData = [
  {
    topic: "OneSimCard General Service Questions",
    companies: [
      "General – Packages",
      "General – Services",
      "General – Coverage"
    ]
  },
  {
    topic: "Rates and Cost Questions",
    companies: [
      "Rates – Data",
      "Rates – Voice",
      "Rates – SMS"
    ]
  },
  {
    topic: "M2M SIM cards",
    companies: [
      "M2M – Expiration Rule",
      "M2M – Usage Details",
      "M2M – Registration",
      "M2M – Mobile App"
    ]
  }
];

export default function M2MSupportForm() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");

  const companies =
    supportData.find((item) => item.topic === selectedTopic)?.companies || [];

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
      {/* Left Sidebar (Dynamic Topics) */}
      <div className="bg-white shadow rounded-xl p-4 h-fit">
        <h2 className="font-semibold text-lg mb-4">Choose a Topic</h2>

        <ul className="space-y-2 text-sm text-gray-700">
          {supportData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedTopic(item.topic);
                setSelectedCompany("");
              }}
              className={`cursor-pointer ${
                selectedTopic === item.topic
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              • {item.topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="md:col-span-2 bg-white shadow rounded-xl p-6 space-y-6">
        {/* Company Dropdown (Dynamic) */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Company</h2>

          {!selectedTopic ? (
            <p className="text-gray-500 text-sm">
              Please select a topic first.
            </p>
          ) : (
            <select
              className="w-full border border-gray-300 rounded-xl p-3 text-sm"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Select Company Question</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Message Box */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Summarize your question and provide as many details as you can:
          </label>
          <textarea className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Enter your Name:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Enter your E-mail Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            OneSimCard Main Phone
          </label>
          <input
            type="text"
            placeholder="+372"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Existing OneSimCard customers
          </p>
        </div>
      </div>
    </div>
  );
}
