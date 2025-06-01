// services/api.js

export async function analyzeBirthData(formData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze birth data");
  }

  return response.json();
}
