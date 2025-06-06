import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Booking from "../pages/Booking";
import ContactUs from "../pages/ContactUs";
import Login from '../components/Login';
import Signup from '../components/Signup';
import BookedTickets from '../pages/BookedTickets';
import AdminPanel from '../pages/AdminPanel';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booked-tickets" element={<BookedTickets />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
