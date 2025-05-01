import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "./TrendingMovies.css";
import { useAuth } from "../context/AuthContext";


const TrendingMovies = () => {
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchSuggestedMovies = async () => {
      const userId = user?.userID;
      console.log("🔥 TrendingMovies mounted. User ID:", userId);
    
      if (!userId) {
        console.warn("⚠️ No user ID found. Skipping genre prediction.");
        return;
      }
    
      try {
        const genreResponse = await fetch(`http://localhost:5001/predict_genre?user_id=${userId}`);
        const genreData = await genreResponse.json();
        const predictedGenre = genreData.predicted_genre;
        console.log("🎯 Predicted Genre:", predictedGenre);
    
        if (!predictedGenre || typeof predictedGenre !== "string") {
          console.warn("⚠️ Invalid predicted genre. Skipping filtering.");
          return;
        }
    
        const movieResponse = await fetch("http://localhost:8080/api/movies/View");
        const movies = await movieResponse.json();
        console.log("🎬 All Movies Fetched:", movies);
    
        const filtered = movies.filter(movie =>
          movie.movieType && typeof movie.movieType === "string" &&
          movie.movieType.toLowerCase().includes(predictedGenre.toLowerCase())
        );
        console.log("✅ Filtered Movies:", filtered);
        
    
        const topFive = filtered.slice(0, 5);
        console.log("🥇 Top 5 Suggested Movies:", topFive);
    
        setSuggestedMovies(topFive);
      } catch (error) {
        console.error("❌ Error fetching suggested movies:", error);
      }
    };


    fetchSuggestedMovies();
  }, [user]);

  return (
    <div className="trending-section">
      <h2 data-aos="fade-up">Suggested Movies</h2>
      {suggestedMovies.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            900: { slidesPerView: 3 },
            600: { slidesPerView: 2 },
            300: { slidesPerView: 1 },
          }}
        >
          {suggestedMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="movie-card" data-aos="fade-up">
                <img src={movie.movieUrl} alt={movie.movieName} />
                <div className="overlay" data-aos="fade-up" data-aos-delay="200">
                  <h3>{movie.movieName}</h3>
                  <p>⭐ {movie.rating}</p>
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-btn"
                  >
                    ▶ Watch Trailer
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p data-aos="fade-up">No suggested movies found or user not logged in.</p>
      )}
    </div>
  );
};

export default TrendingMovies;
