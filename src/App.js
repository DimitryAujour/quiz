import React, { useState, useContext } from 'react';
import AuthContext from './authContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Quiz from './Quiz'; // Import the Quiz component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {isAuthenticated ? (
            <div>
              <h1>Welcome back!</h1>
              <Quiz /> {/* Display the Quiz component here */}
              <button onClick={logout}>Logout</button>
            </div>
        ) : (
            <div>
              <h1>Welcome to the Quiz App</h1>
              <LoginForm />
              <RegisterForm />
            </div>
        )}
      </AuthContext.Provider>
  );
}

export default App;
