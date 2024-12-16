import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { GEMINI_API_KEY } from "@/src/database/config/config.mjs";

export async function POST(req) {
  try {
    // Ensure the API key is loaded
    if (!GEMINI_API_KEY) {
      console.error("Gemini API Key is missing");
      return NextResponse.json(
        { error: "Internal Server Error: API Key is missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Parse the incoming request
    const data = await req.json();
    const prompt = data.body;

    // Validate the prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Bad Request: Invalid or missing prompt" },
        { status: 400 }
      );
    }

    // Send request to Gemini API
    console.log("Sending prompt to Gemini API:", prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the generated content
    const output = await response.text();
    console.log("Generated response from Gemini API:", output);

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error: Failed to generate content" },
      { status: 500 }
    );
  }
}
