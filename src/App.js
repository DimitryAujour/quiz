import React, { useState, useContext } from 'react';
import AuthContext from './authContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


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
              {/* You can place your main app content here, like the quiz interface */}
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

export default App