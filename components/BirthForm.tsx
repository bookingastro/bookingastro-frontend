"use client";
import { useState } from "react";

type FormData = {
  name: string;
  dob: string;
  time: string;
  place: string;
};

const BirthForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    time: "",
    place: "",
  });

  const [result, setResult] = useState<any>(null);
  const [interpretation, setInterpretation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setInterpretation("");

    try {
      const analyzeRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!analyzeRes.ok) throw new Error("Analysis failed.");
      const analyzeData = await analyzeRes.json();
      setResult(analyzeData);

      const interpretRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interpret`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(analyzeData),
        }
      );

      if (!interpretRes.ok) throw new Error("Interpretation failed.");
      const interpretData = await interpretRes.json();
      setInterpretation(interpretData.message);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Birth Chart Analyzer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Full Name"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="dob"
          onChange={handleChange}
          value={formData.dob}
          placeholder="Date of Birth (YYYY-MM-DD)"
          type="date"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="time"
          onChange={handleChange}
          value={formData.time}
          placeholder="Time of Birth (HH:MM)"
          type="time"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="place"
          onChange={handleChange}
          value={formData.place}
          placeholder="Place of Birth"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {loading && (
        <div className="mt-4 text-center text-blue-500 font-semibold">
          Please wait...
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500 bg-red-100 p-3 rounded-md text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Raw Chart Data</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {interpretation && (
        <div className="mt-6 bg-yellow-50 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">AI Interpretation</h2>
          <p className="text-gray-800 whitespace-pre-line">{interpretation}</p>
        </div>
      )}
    </div>
  );
};

export default BirthForm;
