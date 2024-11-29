// app/Login/page.tsx

"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        // Store the token in localStorage or cookies
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard page
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Failed to login:', errorData);
        setError(errorData.error || 'Failed to login');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className={styles.container}>
      {/* Background image for left section */}
      <div className={styles.imageSection} style={{ backgroundImage: "url('/workout2.jpg')" }}></div>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input type="text" id="username" name="username" required className={styles.input} ref={usernameRef} />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" required className={styles.input} ref={passwordRef} />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.divider}>or Login using</div>
          <div className={styles.socialIcons}>
            <button className={styles.socialIcon} title="Login with Gmail">
              <img src="/gmail.png" alt="Gmail" style={{ height: '40px' }} />
            </button>
            <button className={styles.socialIcon} title="Login with Facebook">
              <img src="/facebook.png" alt="Facebook" style={{ height: '43px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
