"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingPage from '@/app/ui/LoadingPage';

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = {
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        router.push('/pages/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Failed to login:', errorData);
        setError(errorData.error || 'Failed to login');
        setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while logging in');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col md:flex-row h-screen">
          {/* Background image for top section (full height on mobile, top half on large screens) */}
          <div className="w-full h-1/2 md:w-3/4 md:h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/workout2.jpg')" }}></div>
          
          {/* Form Section on the bottom (full height on mobile, bottom quarter on large screens) */}
          <div className="w-full h-1/2 md:w-1/4 md:h-full flex justify-center items-center bg-[#1d1919] p-4">
            <div className="w-full max-w-[300px] text-left">
              <h1 className="text-4xl mb-8 text-white text-center">Login</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="username" className="font-bold text-sm text-white">Username</label>
                  <input type="text" id="username" name="username" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" ref={usernameRef} />
                </div>
                <div>
                  <label htmlFor="password" className="font-bold text-sm text-white">Password</label>
                  <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" ref={passwordRef} />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="rememberMe" className="font-bold text-sm text-white">Remember Me</label>
                </div>
                <button type="submit" className="w-full p-2 bg-[#333] text-white border-none rounded-full cursor-pointer text-sm">Login</button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <p className="text-white mt-4 text-center">
              Don&apos;t have an account? <Link href="/pages/signup" className="text-blue-500 underline hover:text-blue-700 transition duration-300">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
