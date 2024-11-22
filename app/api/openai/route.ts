import { NextResponse } from 'next/server';
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store your OpenAI API key in .env
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // Request to OpenAI API
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // You can change this to other models such as gpt-4
      prompt: prompt,
      max_tokens: 100, // Adjust token count as per your requirement
    });

    // Safely access response.data.choices[0].text using optional chaining
    const responseText = response.data.choices?.[0]?.text?.trim() ?? "No response from OpenAI.";

    // Return the response from OpenAI API
    return NextResponse.json({ message: responseText });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
