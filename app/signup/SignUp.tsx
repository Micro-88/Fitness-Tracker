import React, { CSSProperties } from 'react';

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}></div>
      <div style={styles.formSection}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Sign Up</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div>
              <label htmlFor="firstName" style={styles.label}>First name</label>
              <input type="text" id="firstName" name="firstName" required style={styles.input} />
            </div>
            <div>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input type="text" id="username" name="username" required style={styles.input} />
            </div>
            <div>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input type="password" id="password" name="password" required style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>sign up</button>
          </form>
          <div style={styles.divider}>or sign up using</div>
          <div style={styles.socialIcons}>
            <button style={styles.socialIcon} title="Sign up with Gmail">
              <img src="gmail.png" alt="Gmail" style={{ height: '40px' }} />
            </button>
            <button style={styles.socialIcon} title="Sign up with Facebook">
              <img src="facebook.png" alt="Facebook" style={{ height: '43px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: {
  container: CSSProperties;
  imageSection: CSSProperties;
  formSection: CSSProperties;
  formContainer: CSSProperties;
  heading: CSSProperties;
  form: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  button: CSSProperties;
  divider: CSSProperties;
  socialIcons: CSSProperties;
  socialIcon: CSSProperties;
} = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  imageSection: {
    flex: 3,
    backgroundImage: "url('workout2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1919',
    padding: '1rem',
  },
  formContainer: {
    width: '100%',
    maxWidth: '300px',
    textAlign: 'left' as CSSProperties['textAlign'], // Type assertion for textAlign
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'left',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textTransform: 'lowercase',
  },
  divider: {
    textAlign: 'center',
    margin: '1.5rem 0',
    color: '#ffffff',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: '0.6rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#333',
    textDecoration: 'none',
  },
};

export default SignUp;
export {};
