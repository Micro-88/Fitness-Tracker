// app/Login/page.tsx

"use client";

import React from 'react';
import styles from './Login.module.css';

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <input type="text" id="username" name="username" required className={styles.input} />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" required className={styles.input} />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
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
