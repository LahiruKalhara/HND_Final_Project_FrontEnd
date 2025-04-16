import React, { useState, useEffect } from 'react';
import './SeatSelection.css';
import SeatPreview from './SeatPreview';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const SeatSelection = ({ maxSeats = 10, movieID, showDate, showTime }) => {
  const rows = 12;
  const colsPerSide = 15;
  const { user } = useAuth();
  const userID = user?.userID;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [previewSeat, setPreviewSeat] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]); // NEW

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieIDFromURL = queryParams.get('movieID');

  useEffect(() => {
    if (movieIDFromURL) {
      axios.get(`http://localhost:8080/api/movies/${movieIDFromURL}`)
        .then(response => setMovie(response.data))
        .catch(error => console.error('Error fetching movie:', error));
    }
  }, [movieIDFromURL]);

  // NEW: Fetch booked seats
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tickets/View');
        const filtered = response.data.filter(
          ticket =>
            ticket.movieID === movieID &&
            ticket.showDate === showDate &&
            ticket.showTime === showTime
        );

        const extractedSeats = filtered.flatMap(ticket => {
          try {
            return JSON.parse(ticket.seatNumbers);
          } catch {
            return [];
          }
        });

        setBookedSeats(extractedSeats);
      } catch (err) {
        console.error('Failed to fetch booked seats:', err);
      }
    };

    if (movieID && showDate && showTime) {
      fetchBookedSeats();
    }
  }, [movieID, showDate, showTime]);

  const getSeatLabel = (row, col, side) => {
    return `${String.fromCharCode(65 + row)}${side === 'L' ? col + 1 : col + 16}`;
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; // Prevent click
    setError('');
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : prev.length < maxSeats
          ? [...prev, seat]
          : prev
    );
    setPreviewSeat(seat);
  };

  const handlePreviewClick = () => setShowPreview(true);

  const handleContinueClick = async () => {
    if (selectedSeats.length === 0) return setError('Please select at least one seat');
    if (!userID) return setError('You must be logged in to book tickets');
    if (!movieID) return setError('Movie ID not found. Please try again.');
    if (!showDate || !showTime) return setError('Show Date or Time is missing. Please select them.');

    setIsBooking(true);
    setError('');

    const ticketData = {
      userID,
      movieID,
      seatNumbers: JSON.stringify(selectedSeats),
      ticketCount: selectedSeats.length,
      bookingDateTime: new Date().toISOString(),
      totalPrice: selectedSeats.length * 1000,
      showDate,
      showTime,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/tickets/Add', ticketData);
      if (response.status === 200) {
        alert('Booking successful!');
        setSelectedSeats([]);
        setShowPreview(false);
      } else {
        setError('Failed to book the tickets');
      }
    } catch (err) {
      setError('An error occurred during booking');
      console.error('Booking error:', err.response ? err.response.data : err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="seat-selection">
      {movie && (
        <div className="movie-info" data-aos="fade-up">
          <h2>{movie.movieName}</h2>
          <p>{movie.description}</p>
        </div>
      )}

      <div className="screen" data-aos="fade-up">SCREEN</div>

      <div className="seat-grid" data-aos="fade-up">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <div className="seat-side">
              {Array.from({ length: colsPerSide }).map((_, colIndex) => {
                const seat = getSeatLabel(rowIndex, colIndex, 'L');
                const isBooked = bookedSeats.includes(seat);
                return (
                  <div
                    key={seat}
                    className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>

            <div className="walkway"></div>

            <div className="seat-side">
              {Array.from({ length: colsPerSide }).map((_, colIndex) => {
                const seat = getSeatLabel(rowIndex, colIndex, 'R');
                const isBooked = bookedSeats.includes(seat);
                return (
                  <div
                    key={seat}
                    className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="seat-legend" data-aos="fade-up">
        <div className="legend-item">
          <div className="seat-dot available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat-dot booked"></div>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <div className="seat-dot selected"></div>
          <span>Selected</span>
        </div>
      </div>


      {selectedSeats.length > 0 && (
        <div className="buttons-container">
          <button className="preview" onClick={handlePreviewClick}>
            Show Preview for {previewSeat}
          </button>
          <button className="continue" onClick={handleContinueClick} disabled={isBooking}>
            {isBooking ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {showPreview && previewSeat && (
        <SeatPreview seatLabel={previewSeat} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
};

export default SeatSelection;
