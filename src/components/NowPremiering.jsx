import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "aos/dist/aos.css";
import AOS from "aos";
import "./NowPremiering.css";
import { useAuth } from "../context/AuthContext";

const NowPremiering = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let targetGenre = user?.preferredMovieType?.trim()?.toLowerCase();

        if (!targetGenre) {
          const genreRes = await axios.get(
            `http://localhost:5001/predict_genre?user_id=${user?.userID}`
          );
          targetGenre = genreRes.data.predicted_genre?.toLowerCase();
        }

        console.log("🎯 Target genre (NowPremiering):", targetGenre);

        const movieRes = await axios.get(
          "http://localhost:8080/api/movies/View"
        );
        const allPremiering = movieRes.data.filter(
          (m) => m.status === "Premiering"
        );
        console.log("🎬 Premiering movies:", allPremiering);

        const sortedMovies = allPremiering.sort((a, b) => {
          const toArr = (str) =>
            str?.toLowerCase().split(",").map((g) => g.trim()) || [];
          const aMatch = toArr(a.movieType).includes(targetGenre) ? 1 : 0;
          const bMatch = toArr(b.movieType).includes(targetGenre) ? 1 : 0;
          return bMatch - aMatch;
        });

        console.log("✅ Sorted movies:", sortedMovies);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("🔥 Error fetching data:", error);
      }
    };

    fetchData();
    AOS.init({ duration: 1000, once: true });
  }, [user]);

  const handleBooking = (movieID) => {
    navigate(`/booking?movieID=${movieID}`);
  };

  return (
    <div className="now-premiering-container">
      <h2 className="now-premiering-title" data-aos="fade-up">
        Now Premiering
      </h2>

      <Swiper
        grabCursor
        slidesPerView={movies.length < 3 ? movies.length : 3}
        centeredSlides
        spaceBetween={20}
        loop={movies.length > 1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        navigation
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[Autoplay, Navigation, EffectCoverflow]}
        className="now-premiering-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.movieID}
            className="now-premiering-slide"
          >
            <div className="now-premiering-card" data-aos="zoom-in">
              <img
                src={movie.movieUrl}
                alt={movie.movieName}
                className="now-premiering-image"
              />
              <div className="now-premiering-overlay">
                <h3
                  className="now-premiering-movie-title"
                  data-aos="fade-up"
                >
                  {movie.movieName}
                </h3>
                <p
                  className="now-premiering-description"
                  data-aos="fade-up"
                >
                  {movie.description}
                </p>
                <button
                  className="now-premiering-book-btn"
                  data-aos="fade-up"
                  onClick={() => handleBooking(movie.movieID)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NowPremiering;
