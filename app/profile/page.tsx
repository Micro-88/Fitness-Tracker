"use client";

import React from "react";
import styles from "./UserProfile.module.css";

const UserProfile: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Profile image section */}
      <div className={styles.imageSection}>
        <div className={styles.profilePicture}>
          <img src="/profile-pic.jpg" alt="User Profile" className={styles.picture} />
        </div>
        <h2 className={styles.username}>Ellen Joe</h2>
      </div>

      {/* User details and settings section */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsContainer}>
          <h1 className={styles.heading}>Profile Details</h1>
          <div className={styles.detailRow}>
            <span className={styles.label}>First Name:</span>
            <span className={styles.value}>Ellen</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Last Name:</span>
            <span className={styles.value}>Joe</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Height:</span>
            <span className={styles.value}>170cm</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Weight:</span>
            <span className={styles.value}>80kg</span>
          </div>
          <button className={styles.button}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
