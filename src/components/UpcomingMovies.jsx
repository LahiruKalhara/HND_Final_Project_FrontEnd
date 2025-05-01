import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import axios from "axios";
import AOS from "aos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "aos/dist/aos.css";
import "./UpcomingMovies.css";

import { useAuth } from "../context/AuthContext";

const UpcomingMovies = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingSorted = async () => {
      try {
        const genreRes = await axios.get(`http://localhost:5001/predict_genre?user_id=${user.userID}`);
        const predictedGenre = genreRes.data.predicted_genre.toLowerCase();
        console.log("🎯 Predicted genre:", predictedGenre);

        const movieRes = await axios.get("http://localhost:8080/api/movies/View");
        const upcomingMovies = movieRes.data.filter(movie => movie.status === "Upcoming");
        console.log("🎬 Upcoming movies:", upcomingMovies);

        const sortedMovies = upcomingMovies.sort((a, b) => {
          const aGenres = a.movieType?.toLowerCase().split(',').map(g => g.trim()) || [];
          const bGenres = b.movieType?.toLowerCase().split(',').map(g => g.trim()) || [];

          const aMatch = aGenres.includes(predictedGenre) ? 1 : 0;
          const bMatch = bGenres.includes(predictedGenre) ? 1 : 0;

          return bMatch - aMatch;
        });

        console.log("✅ Sorted upcoming movies:", sortedMovies);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("🔥 Error fetching/sorting upcoming movies:", error);
      }
    };

    fetchUpcomingSorted();
    AOS.init({ duration: 1000, once: true });
  }, [user]);

  return (
    <div className="upcoming-movies-container">
      <h2 className="upcoming-movies-title" data-aos="fade-up">Upcoming Movies</h2>

      <Swiper
        grabCursor={true}
        slidesPerView={movies.length < 3 ? movies.length : 3}
        centeredSlides={true}
        spaceBetween={20}
        loop={movies.length > 1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        navigation={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[Autoplay, Navigation, EffectCoverflow]}
        className="upcoming-movies-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movieID} className="upcoming-movies-slide">
            <div className="upcoming-movies-card" data-aos="zoom-in">
              <img src={movie.movieUrl} alt={movie.movieName} className="upcoming-movies-image" />
              <div className="upcoming-movies-overlay">
                <h3 className="upcoming-movies-movie-title" data-aos="fade-up">{movie.movieName}</h3>
                <p className="upcoming-movies-description" data-aos="fade-up">{movie.description}</p>
                <button className="upcoming-movies-book-btn" data-aos="fade-up">
                  View Trailer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingMovies;
