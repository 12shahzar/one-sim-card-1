import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

function BuyNowForm() {
  const [form, setForm] = useState({
    mzmDeviceModel: "",
    mzmApplication: "",
    estimatedQty: "",
    company: "",
    federalId: "",
    hearAboutUs: "",
    
    // Contact Person
    firstName: "",
    lastName: "",
    email: "",
    reEmail: "",
    password: "",
    rePassword: "",
    phone1: "",
    phone2: "",
    
    // Delivery Address (NOT REQUIRED)
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    
    // Signature
    agreeTerms: false,
    signedBy: "",
    title: "",
    fullName: "",
  });

  const requiredFields = [
    "mzmDeviceModel",
    "mzmApplication",
    "estimatedQty",
    "company",
    "federalId",
    "hearAboutUs",
    "firstName",
    "lastName",
    "email",
    "reEmail",
    "password",
    "rePassword",
    "phone1",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let field of requiredFields) {
      if (!form[field] || form[field].trim() === "") {
        alert(`Please fill the ${field} field`);
        return;
      }
    }

    if (!form.agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    console.log("Form Submitted: ", form);
    alert("Form submitted!");
  };

  const inputBox = (label, name, type = "text", required = true, placeholder = "") => (
    <div>
      <label className="block mb-2 text-sm text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        required={required}
        className="w-full bg-[#F8F9FA] h-12 rounded-full px-5 outline-none"
      />
    </div>
  );

  return (
    <div className="py-6 font-sora">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12">

        {/* MZM SECTION */}
        <h2 className="text-2xl font-regular text-black">MZM Device Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inputBox("MZM Device Model(s)", "mzmDeviceModel")}
          {inputBox("MZM Application", "mzmApplication")}
          {inputBox("Estimated QTY", "estimatedQty", "number")}
          {inputBox("Company", "company")}
          {inputBox("Federal ID", "federalId")}
          {inputBox("How did you hear about us?", "hearAboutUs")}
        </div>

        {/* CONTACT PERSON */}
        <h2 className="text-2xl font-regular text-black">Contact Person</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inputBox("First Name", "firstName")}
          {inputBox("Last Name", "lastName")}
          {inputBox("E-mail", "email", "email")}
          {inputBox("Re-type E-mail", "reEmail", "email")}
          {inputBox("Password", "password", "password")}
          {inputBox("Re-type Password", "rePassword", "password")}
          {inputBox("Phone #1", "phone1")}
          {inputBox("Phone #2", "phone2", "text", false)}
        </div>

        {/* DELIVERY ADDRESS */}
        <h2 className="text-2xl font-regular text-black">Delivery Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inputBox("Address Line #1", "address1", "text", false)}
          {inputBox("Address Line #2", "address2", "text", false)}
          {inputBox("City", "city", "text", false)}
          {inputBox("State", "state", "text", false)}
          {inputBox("ZIP", "zip", "text", false)}
          {inputBox("Country", "country", "text", false)}
        </div>

        {/* SIGNATURE SECTION */}
        <h2 className="text-2xl font-regular text-black">Signature</h2>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={form.agreeTerms}
            onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
            className="w-5 h-5"
          />
          <label className="text-sm text-slate-700">Agree To The Terms and Conditions</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inputBox("Signed by:", "signedBy", "text", false)}
          {inputBox("Title", "title", "text", false)}
          {inputBox("Full Name", "fullName", "text", false)}
        </div>

        {/* SUBMIT BUTTON */}
        <CustomButton text="Register" />
      </form>
    </div>
  );
}

export default BuyNowForm;
