import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [form, setForm] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userTelephone: '',
        userAddress: '',
        userRole: 'User',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/Add', form);
            alert('Signup successful!');
            setTimeout(() => {
                navigate("/login");
              }, 1500);
        } catch (error) {
            console.error(error);
            alert('Signup failed!');
        }
    };

    return (
        <div>
            <Header />
            <div className="milano-auth-container">
                <form onSubmit={handleSignup} className="milano-auth-form">
                    <h2>Create Account</h2>
                    <input name="userName" type="text" placeholder="Name" onChange={handleChange} required />
                    <input name="userEmail" type="email" placeholder="Email" onChange={handleChange} required />
                    <input name="userPassword" type="password" placeholder="Password" onChange={handleChange} required />
                    <input name="userConfirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
                    <input name="userTelephone" type="text" placeholder="Phone" onChange={handleChange} required />
                    <input name="userAddress" type="text" placeholder="Address" onChange={handleChange} required />
                    <button type="submit" className="milano-auth-btn">Sign Up</button>
                    <p className="milano-auth-switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
