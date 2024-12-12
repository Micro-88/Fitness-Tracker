import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variables for security

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',  // Choose model based on your preference
          prompt: prompt,
          max_tokens: 100,
        }),
      });

      const data = await response.json();

      if (data.error) {
        return res.status(400).json({ error: data.error });
      }

      return res.status(200).json({ result: data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error reaching OpenAI:', error);
      return res.status(500).json({ error: 'Something went wrong with the API request.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
