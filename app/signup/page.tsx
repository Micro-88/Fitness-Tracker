// app/signup/page.tsx

"use client";

import React from 'react';
import styles from './SignUp.module.css';

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <label htmlFor="firstName" className={styles.label}>First Name</label>
              <input type="text" id="firstName" name="firstName" required className={styles.input} />
            </div>
            <div>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input type="text" id="username" name="username" required className={styles.input} />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" required className={styles.input} />
            </div>
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
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
