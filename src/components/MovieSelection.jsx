import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieSelection.css";

const MovieSelection = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies/View")
      .then((response) => {
        const premieringMovies = response.data.filter(movie => movie.status === "Premiering");
        setMovies(premieringMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSelectedTime(null); // Reset time selection
    onSelectMovie(movie); // Pass movie data to parent component
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="movie-selection-container">
      <h2 className="movie-selection-title" data-aos="fade-up">Select a Movie</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.movieID}
            className={`movie-card ${selectedMovie?.movieID === movie.movieID ? "selected" : ""}`}
            onClick={() => handleMovieSelect(movie)}
            data-aos="zoom-in"
          >
            <img src={movie.movieUrl} alt={movie.movieName} className="movie-image" />
            <div className="movie-overlay">
              <h3 className="movie-title">{movie.movieName}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="showtimes-container" data-aos="fade-up">
          <h3>Select a Showtime</h3>
          <div className="showtimes">
            {selectedMovie.showtimes.map((time, index) => (
              <button
                key={index}
                className={`showtime-btn ${selectedTime === time ? "selected-time" : ""}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSelection;
