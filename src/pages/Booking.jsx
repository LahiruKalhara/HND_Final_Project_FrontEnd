import React from 'react';
import Header from '../components/Header';
import MovieBookingDetails from '../components/MovieBookingDetails';
import SeatSelection from '../components/SeatSelection';
import Footer from '../components/Footer';


const Booking = () => {
  return (
    <div>
      <Header />
      <MovieBookingDetails />
      <SeatSelection />
      <Footer />
    </div>
  );
};

export default Booking;
