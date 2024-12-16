"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { GetUserProfileInToken, UserProfileModel } from '../../../helpers/profile.helper';

const ProfileComponent: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfileModel>({
    username: '',
    age: '',
    gender: '',
    password: '',
    id: ''
  });
  const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      router.push('/pages/login');
      return;
    }

    const profile = GetUserProfileInToken();
    setUserProfile(profile);
    setFormData({
      username: profile?.username || '',
      age: profile?.age || '',
      gender: profile?.gender || '',
      password: '',
      id: profile?.id || ''
    });
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userProfile?.id,
          username: formData.username,
          age: formData.age,
          gender: formData.gender,
          password: formData.password
        })
      });
      if (res.ok) {
        const { token, profile } = await res.json();
        // Update the token in localStorage or sessionStorage
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
        setUserProfile(profile);
        setEditMode(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to update profile');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userProfile?.id })
      });
      if (res.ok) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        router.push('/pages/login');
      } else {
        setError('Failed to delete profile');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to delete profile');
    }
  };

  if (!isClient) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen bg-gray-800 text-white">
      {/* Profile image section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-950 p-8 gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
          <UserCircleIcon className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold">{userProfile?.username}</h2>
      </div>

      {/* Right details section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg text-left shadow-lg">
          <h1 className="text-2xl mb-6">Profile Details</h1>
          {editMode ? (
            <form onSubmit={handleEditProfile}>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Username:</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="text-lg text-gray-400"
                />
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Age:</span>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="text-lg text-gray-400"
                />
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Gender:</span>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="text-lg text-gray-400"
                />
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Password:</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="text-lg text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#333] text-white rounded-full text-sm lowercase mt-4 hover:bg-[#555] transform hover:scale-105 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="w-full py-2 bg-red-700 text-white rounded-full text-sm lowercase mt-4 hover:bg-red-800 transform hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Username:</span>
                <span className="text-lg text-gray-400">{userProfile?.username}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Age:</span>
                <span className="text-lg text-gray-400">{userProfile?.age}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-lg">Gender:</span>
                <span className="text-lg text-gray-400">{userProfile?.gender}</span>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="w-full py-2 bg-[#333] text-white rounded-full text-sm lowercase mt-4 hover:bg-[#555] transform hover:scale-105 transition duration-300"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDeleteProfile}
                className="w-full py-2 bg-red-600 text-white rounded-full text-sm lowercase mt-4 hover:bg-red-700 transform hover:scale-105 transition duration-300"
              >
                Delete Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
