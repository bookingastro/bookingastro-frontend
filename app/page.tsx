'use client';

import BirthForm from '../components/BirthForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Birth Chart Analyzer</h1>
      <BirthForm />
    </main>
  );
}
