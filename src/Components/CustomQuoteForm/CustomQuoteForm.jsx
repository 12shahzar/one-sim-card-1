import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { submitCustomQuote } from "../../api/apiService";


export default function CustomQuoteForm() {
  const [form, setForm] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    countries: "",
    code: "",
    phone: "",
    sims: "",
    dataUse: "",
    comments: "",
  });

  const fields = [
    { name: "company", label: "Company" },
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email", placeholder: "@abc.com" },
    { name: "countries", label: "Countries" },
    { name: "code", label: "Code" },
    { name: "phone", label: "Phone Number" },
  ];

  const submit = async (e) => {
    e.preventDefault();

    // Required fields
    const requiredFields = [
      "company",
      "firstName",
      "lastName",
      "email",
      "countries",
      "code",
      "phone",
      "sims",
      "dataUse",
    ];

    for (let field of requiredFields) {
      if (!form[field] || form[field].trim() === "") {
        alert(`Please fill the ${field} field`);
        return;
      }
    }

    // Build payload same as your Node.js axios example
    const payload = {
      company: form.company,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      countries: form.countries,
      code: form.code,
      phone: form.phone,
      sims: Number(form.sims),
      dataUse: form.dataUse,
      comments: form.comments || "",
    };

    try {
      const data = await submitCustomQuote(payload);

      console.log("Response:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to submit. Check console for error.");
    }
  };

  return (
    <div className="py-5">
      <form onSubmit={submit} className="flex flex-col gap-10">
        {/* 3 fields per row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block mb-2 text-sm text-slate-700">
                {f.label}
              </label>
              <input
                required
                placeholder={f.placeholder || ""}
                value={form[f.name]}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
              />
            </div>
          ))}

          {/* SIMs and Data Use side by side */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm text-slate-700">
                  Estimate number of IoT SIM cards
                </label>
                <input
                  required
                  type="number"
                  value={form.sims}
                  onChange={(e) => setForm({ ...form, sims: e.target.value })}
                  className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-700">
                  Average data use per IoT SIM card, MB
                </label>
                <select
                  required
                  value={form.dataUse}
                  onChange={(e) =>
                    setForm({ ...form, dataUse: e.target.value })
                  }
                  className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
                >
                  <option value="">Select data use</option>
                  <option value="25">25 MB</option>
                  <option value="50">50 MB</option>
                  <option value="100">100 MB</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block mb-3 text-sm text-slate-700">Comments</label>
          <textarea
            rows={4}
            placeholder="Write here"
            value={form?.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
            className="w-full bg-[#F8F9FA] **:rounded-2xl p-5 outline-none rounded-xl"
          />
        </div>

        {/* Submit Button */}

        <CustomButton onClick={() => { }} text="Contact Me" />
      </form>
    </div>
  );
}
