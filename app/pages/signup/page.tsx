"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = {
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
      age: ageRef.current?.value || '',
      gender: gender,
    };

    // console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/userController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // console.log('User created successfully');
        router.push('/pages/login'); // Redirect to login page upon successful sign-up
      } else {
        const errorData = await response.json();
        console.error('Failed to create user:', errorData);
        setError(errorData.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while creating the user');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full h-1/2 md:w-3/4 md:h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/workout2.jpg')" }}></div>
      <div className="w-full h-1/2 md:w-1/4 md:h-full flex justify-center items-center bg-[#1d1919] p-4">
        <div className="w-full max-w-[300px] text-left">
          <h1 className="text-4xl mb-8 text-white text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="username" className="font-bold text-sm text-white">Username</label>
              <input type="text" id="username" name="username" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" ref={usernameRef} />
            </div>
            <div>
              <label htmlFor="password" className="font-bold text-sm text-white">Password</label>
              <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" ref={passwordRef} />
            </div>
            <div>
              <label htmlFor="gender" className="font-bold text-sm text-white">Gender</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-base text-black"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="font-bold text-sm text-white">Age</label>
              <input type="number" id="age" name="age" required className="w-full p-2 border border-gray-300 rounded-md text-base text-black" ref={ageRef} />
            </div>
            <button type="submit" className="w-full p-2 bg-[#333] text-white border-none rounded-full cursor-pointer text-sm">Sign Up</button>
          </form>
          <p className="text-white mt-4 text-center">
          Already have an account? <Link href="/pages/login" className="text-blue-500 underline hover:text-blue-700 transition duration-300">Log in</Link>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
