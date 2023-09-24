import React, { useState } from 'react';
import styles from './RegisterForm.module.css';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // For displaying feedback to the user

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.status === 201) {
                setMessage('User registered successfully!');
            } else {
                const data = await response.json();
                setMessage(data.error || 'Failed to register user');
            }
        } catch (error) {
            setMessage('Failed to register user. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
            />
            <button
                type="submit"
                className={styles.submitButton}
            >
                Register
            </button>
        </form>
    );
}

export default RegisterForm;
