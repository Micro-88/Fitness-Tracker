"use client";

import React, { useState } from "react";

const TestPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Unknown error occurred.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResponse(data.output || "No response received.");
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Gemini API Test</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <textarea
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-red-500 font-semibold">{error}</p>
      )}
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded-md w-full max-w-md">
          <h2 className="font-bold text-lg mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;
