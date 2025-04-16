import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieBookingDetails.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';

const MovieBookingDetails = ({
  numAdults,
  setNumAdults,
  numChildren,
  setNumChildren,
  setSelectedMovieID,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  totalPrice,
  setTotalPrice
}) => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const movieIDFromURL = queryParams.get('movieID');

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchMoviesAndShowtimes = async () => {
      try {
        const [moviesRes, showtimesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/movies/View'),
          axios.get('http://localhost:8080/api/showtimes/View'),
        ]);

        const premieringMovies = moviesRes.data.filter(m => m.status === 'Premiering');
        setMovies(premieringMovies);
        setShowtimes(showtimesRes.data);

        if (movieIDFromURL) {
          const matchedMovie = premieringMovies.find(m => m.movieID.toString() === movieIDFromURL);
          if (matchedMovie) {
            setSelectedMovie(matchedMovie.movieName);
            setSelectedMovieID(matchedMovie.movieID);
          }
        }
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError('Failed to load movies or showtimes.');
      }
    };

    fetchMoviesAndShowtimes();
  }, [movieIDFromURL, setSelectedMovieID]);

  useEffect(() => {
    if (selectedMovie) {
      const relevantShowtimes = showtimes.filter(s => s.movie.movieName === selectedMovie);
      setFilteredShowtimes(relevantShowtimes);
    }
  }, [selectedMovie, showtimes]);

  useEffect(() => {
    const adultPrice = 1000;
    const childPrice = 500;
    const total = (numAdults * adultPrice) + (numChildren * childPrice);
    setTotalPrice(total);
  }, [numAdults, numChildren, setTotalPrice]);

  const handleMovieChange = (e) => {
    const movieName = e.target.value;
    setSelectedMovie(movieName);
    setSelectedDate('');
    setSelectedTime('');
    setError('');

    const selected = movies.find(m => m.movieName === movieName);
    if (selected) {
      setSelectedMovieID(selected.movieID);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setError('');
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setError('');
  };

  const availableDates = [...new Set(filteredShowtimes.map(s => s.showDate))];
  const availableTimes = filteredShowtimes
    .filter(s => s.showDate === selectedDate)
    .map(s => s.showTime);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setError('Show Date or Time is missing. Please select them.');
      return;
    }

    console.log('Booking submitted with:', {
      movie: selectedMovie,
      date: selectedDate,
      time: selectedTime,
      adults: numAdults,
      children: numChildren,
      totalPrice
    });
  };

  return (
    <div className="movie-booking-details">
      <form onSubmit={handleSubmit}>
        <div className="combo-box" data-aos="fade-up">
          <label>Select Movie</label>
          <select value={selectedMovie} onChange={handleMovieChange}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.movieID} value={movie.movieName}>
                {movie.movieName}
              </option>
            ))}
          </select>
        </div>

        {selectedMovie && (
          <div className="date-selection" data-aos="fade-up">
            <label>Select Date</label>
            <div className="date-row">
              {availableDates.map((date, index) => (
                <button
                  type="button"
                  key={index}
                  className={`date-btn ${selectedDate === date ? 'highlight' : ''}`}
                  onClick={() => handleDateChange(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && (
          <div className="time-selection" data-aos="fade-up">
            <label>Select Time</label>
            <div className="time-row">
              {availableTimes.map((time, index) => (
                <button
                  type="button"
                  key={index}
                  className={`time-btn ${selectedTime === time ? 'highlight' : ''}`}
                  onClick={() => handleTimeChange(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="Seat-selection-container">
          <div className="seat-selection2" data-aos="fade-up">
            <label>Number of Adult Seats:</label>
            <input
              type="number"
              value={numAdults}
              onChange={(e) => setNumAdults(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="seat-selection2" data-aos="fade-up">
            <label>Number of Child Seats:</label>
            <input
              type="number"
              value={numChildren}
              onChange={(e) => setNumChildren(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="total-price" data-aos="fade-up">
          <h3>Total Price: {totalPrice} .Rs</h3>
        </div>
      </form>
    </div>
  );
};

export default MovieBookingDetails;
