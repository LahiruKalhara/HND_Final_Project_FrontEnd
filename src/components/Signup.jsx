import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: '',
        userTelephone: '',
        userAddress: '',
        preferredMovieType: '',   
        userRole: 'User',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (form.userPassword !== form.userConfirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/users/Add', form);
            alert('Signup successful!');
            setTimeout(() => {
                navigate('/login');
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

                    <input
                        name="userName"
                        type="text"
                        placeholder="Name"
                        value={form.userName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="userEmail"
                        type="email"
                        placeholder="Email"
                        value={form.userEmail}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="userPassword"
                        type="password"
                        placeholder="Password"
                        value={form.userPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="userConfirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={form.userConfirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="userTelephone"
                        type="text"
                        placeholder="Phone"
                        value={form.userTelephone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="userAddress"
                        type="text"
                        placeholder="Address"
                        value={form.userAddress}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="preferredMovieType"
                        placeholder="Which Movies do you like?"
                        value={form.preferredMovieType}
                        onChange={handleChange}
                        className="milano-auth-select"
                        required
                    >

                        <option value="">Which movies do you like?</option>
                        <option value="Action">Action</option>
                        <option value="Sci-Fi">Sci‑Fi</option>
                        <option value="Animation">Animation</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Drama">Drama</option>
                        <option value="Romance">Romance</option>
                        <option value="Sports">Sports</option>
                        <option value="Adventure">Adventure</option>
                    </select>


                    <button type="submit" className="milano-auth-btn">
                        Sign Up
                    </button>

                    <p className="milano-auth-switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
