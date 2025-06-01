"use client";

import BirthForm from "@/components/BirthForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">BookingAstro</h1>
      <BirthForm />
    </div>
  );
}
