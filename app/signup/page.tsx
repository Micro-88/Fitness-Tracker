// app/signup/page.tsx

"use client";

import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const firstnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = {
      firstname: firstnameRef.current?.value || '',
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/userController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('User created successfully');
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
    <div className={styles.container}>
      {/* Background image for left section */}
      <div className={styles.imageSection} style={{ backgroundImage: "url('/workout2.jpg')" }}></div>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Sign Up</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="firstname" className={styles.label}>First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                className={styles.input}
                ref={firstnameRef}
              />
            </div>
            <div>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className={styles.input}
                ref={usernameRef}
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className={styles.input}
                ref={passwordRef}
              />
            </div>
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.divider}>or sign up using</div>
          <div className={styles.socialIcons}>
            <button className={styles.socialIcon} title="Sign up with Gmail">
              <img src="/gmail.png" alt="Gmail" style={{ height: '40px' }} />
            </button>
            <button className={styles.socialIcon} title="Sign up with Facebook">
              <img src="/facebook.png" alt="Facebook" style={{ height: '43px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
