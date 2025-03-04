import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./NowPremiering.css";

const NowPremiering = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="now-premiering">
      <h2 className="section-title" data-aos="fade-up">Now Premiering</h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Navigation]}
        className="movie-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movieID} className="movie-slide">
            <div className="movie-card" style={{ backgroundImage: `url(${movie.movieUrl})` }}>
              <div className="overlay">
                <h3 className="movie-title">{movie.movieName}</h3>
                <p className="movie-description">{movie.description}</p>
                <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                  <button className="watch-trailer">Watch Trailer</button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NowPremiering;
