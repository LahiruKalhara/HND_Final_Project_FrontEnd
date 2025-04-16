import React, { useState } from 'react';
import Header from '../components/Header';
import MovieBookingDetails from '../components/MovieBookingDetails';
import SeatSelection from '../components/SeatSelection';
import Footer from '../components/Footer';

const Booking = () => {
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedMovieID, setSelectedMovieID] = useState(null); 
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);


  return (
    <div>
      <Header />
      <MovieBookingDetails
        numAdults={numAdults}
        setNumAdults={setNumAdults}
        numChildren={numChildren}
        setNumChildren={setNumChildren}
        setSelectedMovieID={setSelectedMovieID}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} 
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime} 
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      <SeatSelection
        maxSeats={numAdults + numChildren}
        movieID={selectedMovieID} 
        showDate={selectedDate}  
        showTime={selectedTime}  
      />
      <Footer />
    </div>
  );
};

export default Booking;
