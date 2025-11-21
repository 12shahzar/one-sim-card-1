import React from "react";

export default function M2MSupportForm() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
      {/* Left Sidebar */}
      <div className="bg-white shadow rounded-xl p-4 h-fit">
        <h2 className="font-semibold text-lg mb-4">Choose a Topic</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>OneSimCard General Service Questions</li>
          <li>Rates and Cost Questions</li>
          <li>Ordering Questions</li>
          <li>How To Use Questions</li>
          <li>Troubleshooting Questions</li>
          <li>OneSim Card Rentals</li>
          <li>OneSim VoIP</li>
          <li className="text-blue-600 font-semibold">• M2M SIM cards?</li>
          <li>GDPR Requests</li>
          <li>Other</li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="md:col-span-2 bg-white shadow rounded-xl p-6 space-y-6">
        {/* FAQ Section */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Company</h2>
          <ul className="space-y-2 text-sm text-gray-700 list-disc ml-6">
            <li>Are there any data packages available for</li>
            <li>What services are provided on M2M SIM Card?</li>
            <li>What network coverage is offered on M2M SIM Card?</li>
            <li className="font-semibold text-blue-600">What is the expiration rule for OneSimCard M2M SIM card?</li>
            <li>Will I be able to see the usage details for my M2M SIM card?</li>
            <li>How do I register for an M2M account?</li>
            <li>Is there a mobile app for M2M account?</li>
          </ul>
        </div>

        {/* Message Box */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Summarize your question and provide as many details as you can:
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Enter your Name:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Enter your E-mail Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">OneSimCard Main Phone</label>
          <input
            type="text"
            placeholder="+372"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Existing OneSimCard customers</p>
        </div>
      </div>
    </div>
  );
}
