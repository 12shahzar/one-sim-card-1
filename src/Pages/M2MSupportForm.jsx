import React, { useState } from "react";
import CustomButton from "../Components/CustomButton/CustomButton";
import supportData from "../data/supportData";
import { submitM2MSupport } from "../api/apiService";


export default function M2MSupportForm() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const companies =
    supportData?.find((item) => item?.topic === selectedTopic)?.companies || [];

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!selectedTopic) return alert("Please select a topic.");
    if (!selectedCompany) return alert("Please select a company question.");
    if (!message.trim()) return alert("Message is required.");
    if (!name.trim()) return alert("Name is required.");
    if (!email.trim()) return alert("Email is required.");

    const formData = {
      topic: selectedTopic,
      company: selectedCompany,
      message,
      name,
      email,
      phone: phone || "", // optional
    };

    try {
      const data = await submitM2MSupport(formData);

      console.log("API Response:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to submit. Check console for details.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 font-sora px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 font-sora">
      {/* Left Sidebar */}
      <div className="bg-white rounded-4xl p-2 md:p-6 shadow-[0_8px_90px_rgba(0,0,0,0.04)] h-fit">
        <h2 className="text-base md:text-3xl font-medium text-slate-700 mb-4">
          Choose a Topic
        </h2>

        <ul className="space-y-2 text-base text-slate-700">
          {supportData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedTopic(item.topic);
                setSelectedCompany("");
              }}
              className={`cursor-pointer ${selectedTopic === item.topic
                  ? "text-[#455E86] font-semibold"
                  : ""
                }`}
            >
              - {item.topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="md:col-span-2 bg-white rounded-4xl p-2 md:p-6 shadow-[0_8px_90px_rgba(0,0,0,0.04)]">
        <div>
          <h2 className="text-sm text-slate-700 mb-3">Company</h2>

          {!selectedTopic ? (
            <p className="text-gray-500 text-sm">
              Please select a topic first.
            </p>
          ) : (
            <select
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
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
          <label className="block text-sm text-slate-700 my-3">
            Summarize your question:
          </label>
          <textarea
            className="w-full bg-[#F8F9FA] p-5 outline-none rounded-xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-700 my-3">
              Enter your Name:
            </label>
            <input
              type="text"
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 my-3">
              Enter your E-mail Address
            </label>
            <input
              type="email"
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Phone Optional */}
        <div>
          <label className="block text-sm text-slate-700 my-3">
            OneSimCard Main Phone (Optional)
          </label>
          <input
            type="text"
            placeholder="+372"
            className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="my-6">
          <CustomButton onClick={handleSubmit} text="Contact Me" />
        </div>
      </div>
    </div>
  );
}
