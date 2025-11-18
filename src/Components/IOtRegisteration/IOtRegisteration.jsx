import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

function IOtRegisteration() {
  const [form, setForm] = useState({
    businessName: "",
    firstName: "",
    lastName: "",
    businessPhone: "",
    faxNumber: "",
    email: "",
    reEmail: "",
    password: "",
    rePassword: "",
    url: "",
    federalId: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    monthlySales: "",
    hearAbout: "",
    comment: "",
  });

  // Required fields (others optional per your instruction)
  const requiredFields = [
    "businessName",
    "firstName",
    "lastName",
    "businessPhone",
    "email",
    "reEmail",
    "password",
    "rePassword",
    "address1",
    "city",
    "state",
    "zip",
    "country",
    "monthlySales",
    "hearAbout",
  ];

  const submit = (e) => {
    e.preventDefault();

    // Validation
    for (let field of requiredFields) {
      if (!form[field] || form[field].trim() === "") {
        alert(`Please fill the ${field} field`);
        return;
      }
    }

    if (form.email !== form.reEmail) {
      alert("Emails do not match");
      return;
    }

    if (form.password !== form.rePassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="py-5">
      <form onSubmit={submit} className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Business Name */}
          <Input label="Business Name" name="businessName" form={form} setForm={setForm} required />

          {/* First Name */}
          <Input label="First Name" name="firstName" form={form} setForm={setForm} required />

          {/* Last Name */}
          <Input label="Last Name" name="lastName" form={form} setForm={setForm} required />

          {/* Business Phone */}
          <Input label="Business Phone Number" name="businessPhone" form={form} setForm={setForm} required />

          {/* Fax Number (optional) */}
          <Input label="Fax Number" name="faxNumber" form={form} setForm={setForm} />

          {/* Email */}
          <Input label="E-mail" name="email" type="email" form={form} setForm={setForm} required />

          {/* Retype Email */}
          <Input label="Retype E-mail" name="reEmail" type="email" form={form} setForm={setForm} required />

          {/* Password */}
          <Input label="Password" name="password" type="password" form={form} setForm={setForm} required />

          {/* Retype Password */}
          <Input label="Re-type Password" name="rePassword" type="password" form={form} setForm={setForm} required />

          {/* URL (optional) */}
          <Input label="URL" name="url" form={form} setForm={setForm} />

          {/* Federal ID / SSN (optional) */}
          <Input label="Federal ID / SSN" name="federalId" form={form} setForm={setForm} />

          {/* Address Line #1 */}
          <Input label="Address Line #1" name="address1" form={form} setForm={setForm} required />

          {/* Address Line #2 (optional) */}
          <Input label="Address Line #2" name="address2" form={form} setForm={setForm} />

          {/* City */}
          <Input label="City" name="city" form={form} setForm={setForm} required />

          {/* State */}
          <div>
            <label className="block mb-2 text-sm text-slate-700">State</label>
            <select
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
            >
              <option value="">Select State</option>
              <option value="NY">New York</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              {/* Add all states if needed */}
            </select>
          </div>

          {/* ZIP */}
          <Input label="ZIP" name="zip" form={form} setForm={setForm} required />

          {/* Country */}
          <div>
            <label className="block mb-2 text-sm text-slate-700">Country</label>
            <select
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
            >
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Expected Monthly Sales */}
          <Input
            label="Expected Monthly Sales, $"
            name="monthlySales"
            type="number"
            form={form}
            setForm={setForm}
            required
          />

          {/* How did you hear about us? */}
          <div>
            <label className="block mb-2 text-sm text-slate-700">How did you hear about us?</label>
            <select
              required
              value={form.hearAbout}
              onChange={(e) => setForm({ ...form, hearAbout: e.target.value })}
              className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
            >
              <option value="">Select an option</option>
              <option value="Google">Google</option>
              <option value="Friend">Friend</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>

        {/* Comment (optional) */}
        <div>
          <label className="block mb-3 text-sm text-slate-700">Comment</label>
          <textarea
            rows={4}
            placeholder="Write here"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full bg-[#F8F9FA] rounded-2xl p-5 outline-none"
          />
        </div>

        {/* Submit Button */}
        <CustomButton type="submit" text="Submit" />
      </form>
    </div>
  );
}

// Reusable Input Component
function Input({ label, name, form, setForm, type = "text", required }) {
  return (
    <div>
      <label className="block mb-2 text-sm text-slate-700">{label}</label>
      <input
        type={type}
        required={required}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
      />
    </div>
  );
}

export default IOtRegisteration;
