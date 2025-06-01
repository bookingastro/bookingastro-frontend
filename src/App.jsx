import React from "react";
import BirthForm from "./components/BirthForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">BookingAstro</h1>
      <BirthForm />
    </div>
  );
}

export default App;