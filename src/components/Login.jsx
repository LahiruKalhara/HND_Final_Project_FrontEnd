import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/users/View');
      const user = response.data.find(
        (u) => u.userEmail === email && u.userPassword === password
      );

      if (user) {
        login(user);
        alert(`Welcome back, ${user.userName}!`);
        navigate('/');
      } else {
        alert('Invalid email or password!');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <Header />
      <div className="milano-auth-container">
        <form onSubmit={handleLogin} className="milano-auth-form">
          <h2>Login</h2>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="milano-auth-btn">Login</button>
          <p className="milano-auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
