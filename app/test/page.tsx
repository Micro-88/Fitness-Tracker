'use client';

import { useState } from 'react';

const YourPage = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Reset previous error message

    try {
      // Replace with your API endpoint
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Try parsing the response as JSON
      const data = await response.json();
      console.log('API Response:', data);

      // Handle the response data as needed
    } catch (err: any) {
      if (err.message.includes('Unexpected token')) {
        setError('Failed to parse JSON response. The response might be HTML.');
      } else {
        setError(err.message || 'An error occurred');
      }
      console.error('Fetch error:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default YourPage;
