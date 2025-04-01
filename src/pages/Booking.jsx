import React from 'react';
import Header from '../components/Header';
import MovieBookingDetails from '../components/MovieBookingDetails';
import SeatSelection from '../components/SeatSelection';


const Booking = () => {
  return (
    <div>
      <Header />
      <MovieBookingDetails />
      <SeatSelection />
    </div>
  );
};

export default Booking;
