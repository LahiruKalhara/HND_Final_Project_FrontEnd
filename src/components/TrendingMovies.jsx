import React, { useEffect, useState } from "react";
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
      const preferredGenre = user?.preferredMovieType?.trim(); 
      console.log("🔥 TrendingMovies mounted. User ID:", userId);
      console.log("🎞️ Preferred Genre (from profile):", preferredGenre);

      if (!userId) {
        console.warn("⚠️ No user ID found. Skipping suggestions.");
        return;
      }


      let targetGenre = preferredGenre;

      if (!targetGenre) {
        try {
          const genreRes = await fetch(
            `http://localhost:5001/predict_genre?user_id=${userId}`
          );
          const { predicted_genre } = await genreRes.json();
          targetGenre =
            typeof predicted_genre === "string" ? predicted_genre : null;
          console.log("🤖 Predicted Genre (fallback):", targetGenre);
        } catch (err) {
          console.error("❌ Error predicting genre:", err);
          return;
        }
      }

      if (!targetGenre) {
        console.warn("⚠️ No genre available. Aborting filtering.");
        return;
      }

     
      try {
        const movieRes = await fetch("http://localhost:8080/api/movies/View");
        const movies = await movieRes.json();
        console.log("🎬 All Movies Fetched:", movies);

        const filtered = movies.filter(
          (m) =>
            m.status === "Premiering" &&
            typeof m.movieType === "string" &&
            m.movieType.toLowerCase().includes(targetGenre.toLowerCase())
        );
        console.log("✅ Filtered Movies:", filtered);

        setSuggestedMovies(filtered.slice(0, 5));
      } catch (error) {
        console.error("❌ Error fetching suggested movies:", error);
      }
    };

    fetchSuggestedMovies();
  }, [user]);

  return (
    <div className="trending-section">
      <h2 data-aos="fade-up">Suggested Movies</h2>
      {suggestedMovies.length ? (
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
          {suggestedMovies.map((movie, idx) => (
            <SwiperSlide key={idx}>
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
        <p data-aos="fade-up">
          No suggested movies found or user not logged in.
        </p>
      )}
    </div>
  );
};

export default TrendingMovies;
