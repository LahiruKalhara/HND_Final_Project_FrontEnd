import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LatestMovies.css";
import { useAuth } from "../context/AuthContext";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSortLatest = async () => {
      try {
        /* 1️⃣  Decide target genre */
        let targetGenre = user?.preferredMovieType?.trim()?.toLowerCase();

        if (!targetGenre) {
          const genreRes = await axios.get(
            `http://localhost:5001/predict_genre?user_id=${user?.userID}`
          );
          targetGenre = genreRes.data.predicted_genre?.toLowerCase();
        }

        console.log("🎯 Target genre (LatestMovies):", targetGenre);

        const movieRes = await axios.get("http://localhost:8080/api/movies/View");
        const premieringMovies = movieRes.data.filter(
          (m) => m.status === "Premiering"
        );
        console.log("📽️ Premiering movies:", premieringMovies);

        const sortedMovies = premieringMovies.sort((a, b) => {
          const toArr = (str) =>
            str?.toLowerCase().split(",").map((g) => g.trim()) || [];
          const aMatch = toArr(a.movieType).includes(targetGenre) ? 1 : 0;
          const bMatch = toArr(b.movieType).includes(targetGenre) ? 1 : 0;
          return bMatch - aMatch;
        });

        console.log("✅ Sorted latest movies:", sortedMovies);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("🔥 Error fetching latest movies:", error);
      }
    };

    fetchAndSortLatest();
    AOS.init({ duration: 1000, once: true });
  }, [user]);

  const handleBooking = (movieID) => {
    navigate(`/booking?movieID=${movieID}`);
  };

  return (
    <div className="latest-movies-container">
      <h2 className="latest-movies-title" data-aos="fade-up">
        Latest Movies
      </h2>
      <div className="latest-movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.movieID}
            className="latest-movie-card"
            data-aos="fade-up"
          >
            <img
              src={movie.movieUrl}
              alt={movie.movieName}
              className="latest-movie-image"
            />
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
