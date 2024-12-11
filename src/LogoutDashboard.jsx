import React from 'react';

const LogoutDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828427.png"
          alt="Logout Icon"
          style={styles.icon}
        />
        <h1 style={styles.heading}>You have successfully logged out</h1>
        <p style={styles.text}>We hope to see you again soon!</p>
        <button style={styles.button} onClick={() => window.location.href = '/login'}>
          Log Back In
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  card: {
    textAlign: 'center',
    background: '#fff',
    padding: '40px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '90%',
  },
  icon: {
    width: '80px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

styles.button[':hover'] = {
  backgroundColor: '#0056b3',
};

export default LogoutDashboard;
