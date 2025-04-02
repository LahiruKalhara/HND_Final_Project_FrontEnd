import React, { useState } from 'react';
import './SeatSelection.css';

const SeatSelection = () => {
  const rows = 12; 
  const colsPerSide = 15; 
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatLabel = (row, col, side) => {
    return `${String.fromCharCode(65 + row)}${side === 'L' ? col + 1 : col + 16}`;
  };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="seat-selection">
      <div className="screen"  data-aos="fade-up">SCREEN</div>
      <div className="seat-grid"  data-aos="fade-up">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
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

            <div className="walkway"></div>

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
