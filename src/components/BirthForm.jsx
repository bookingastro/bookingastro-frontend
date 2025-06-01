import React, { useState } from "react";

const BirthForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
        <input name="dob" onChange={handleChange} placeholder="Date of Birth (YYYY-MM-DD)" className="w-full p-2 border" />
        <input name="time" onChange={handleChange} placeholder="Time of Birth (HH:MM)" className="w-full p-2 border" />
        <input name="place" onChange={handleChange} placeholder="Place of Birth" className="w-full p-2 border" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Analyze</button>
      </form>
      {result && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default BirthForm;