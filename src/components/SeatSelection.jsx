import React, { useState } from 'react';
import './SeatSelection.css';

const SeatSelection = () => {
  const rows = 12; // Number of rows
  const colsPerSide = 15; // 15 seats per side
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate seat labels (e.g., A1, A2... L30)
  const getSeatLabel = (row, col, side) => {
    return `${String.fromCharCode(65 + row)}${side === 'L' ? col + 1 : col + 16}`;
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="seat-selection" data-aos="fade-up">
      <div className="screen">SCREEN</div>
      <div className="seat-grid">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {/* Left Side Seats */}
            <div className="seat-side">
              {Array.from({ length: colsPerSide }).map((_, colIndex) => {
                const seat = getSeatLabel(rowIndex, colIndex, 'L');
                return (
                  <div
                    key={seat}
                    className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>

            {/* Middle Walkway */}
            <div className="walkway"></div>

            {/* Right Side Seats */}
            <div className="seat-side">
              {Array.from({ length: colsPerSide }).map((_, colIndex) => {
                const seat = getSeatLabel(rowIndex, colIndex, 'R');
                return (
                  <div
                    key={seat}
                    className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
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
      <button className='continue'>Continue</button>
    </div>
  );
};

export default SeatSelection;
