import React, { useState, useEffect } from 'react';
import './MovieBookingDetails.css';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const MovieBookingDetails = () => {
  // State for selected movie, date, and time
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const movies = [
    'The Marvels',
    'Dune: Part Two',
    'Kung Fu Panda 4',
    'Magazine Dreams',
    'The Gorge',
    'Snow White',
    'Rule Breakers',
    'Mickey 17',
  ];

  const dates = ['April 5, 2025', 'April 6, 2025', 'April 7, 2025', 'April 8, 2025', 'April 9, 2025'];

  const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="movie-booking-details">
      <div className="combo-box" data-aos="fade-up">
        <label data-aos="fade-up">Select Movie</label>
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="" data-aos="fade-up">Select a movie</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>

      <div className="date-selection" data-aos="fade-up">
        <label data-aos="fade-up">Select Date</label>
        <div className="date-row" data-aos="fade-up">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`date-btn ${selectedDate === date ? 'highlight' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div className="time-selection" data-aos="fade-up">
        <label data-aos="fade-up">Select Time</label>
        <div className="time-row" data-aos="fade-up">
          {times.map((time, index) => (
            <button
              key={index}
              className={`time-btn ${selectedTime === time ? 'highlight' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieBookingDetails;
