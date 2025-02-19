import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Booking from "../pages/Booking";
import ContactUs from "../pages/ContactUs";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
