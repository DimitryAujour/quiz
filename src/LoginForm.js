// LoginForm.js
import React, { useState, useContext } from 'react';
import AuthContext from './authContext';
import styles from './LoginForm.module.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to your backend's login endpoint
            const response = await fetch('http://localhost:5000/api/login',
            {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            console.log(response);
             // This will show the raw response body

            const responseBody = await response.text();
            console.log("Response body:", responseBody);
            const data = JSON.parse(responseBody);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login.');
            }


            if (data.token) {
                // The login was successful
                auth.login();
                // Optionally, store the token securely
                // For example: localStorage.setItem('token', data.token);
            } else {
                // Handle login errors (e.g., wrong credentials)
                console.error('Failed to login.');
            }
        } catch (error) {
            console.error('There was an error logging in:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input type="text" className={styles.inputField} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" className={styles.inputField} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
            <button type="submit" className={styles.submitButton}>Login</button>
        </form>
    );
}

export default LoginForm;
