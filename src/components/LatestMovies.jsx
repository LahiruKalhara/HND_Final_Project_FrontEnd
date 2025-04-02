import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "aos/dist/aos.css"; 
import AOS from "aos"; 
import "./LatestMovies.css";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); 

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

    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleBooking = (movieID) => {
    navigate(`/booking?movieID=${movieID}`);
  };

  return (
    <div className="latest-movies-container">
      <h2 className="latest-movies-title" data-aos="fade-up">Latest Movies</h2>
      <div className="latest-movies-grid">
        {movies.map((movie) => (
          <div key={movie.movieID} className="latest-movie-card" data-aos="fade-up">
            <img src={movie.movieUrl} alt={movie.movieName} className="latest-movie-image" />
            <div className="latest-movie-overlay">
              <h3 className="latest-movie-title">{movie.movieName}</h3>
              <button 
                className="latest-movie-book-btn" 
                onClick={() => handleBooking(movie.movieID)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestMovies;
