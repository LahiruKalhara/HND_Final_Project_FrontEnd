import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "./TrendingMovies.css";

const trendingMovies = [
  { title: "Captain America : Brave New World", rating: "8.9", image: "https://lumiere-a.akamaihd.net/v1/images/au_movies_marvelstudios_captainamerica_bravenewworld_pa_08035399.jpeg", trailer: "https://youtu.be/1pHDWnXmK7Y?si=9toPYO-RGGVUbOqq" },
  { title: "Moana 2", rating: "8.5", image: "https://m.media-amazon.com/images/M/MV5BZDUxNThhYTUtYjgxNy00MGQ4LTgzOTEtZjg1YTU5NTcwNThlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", trailer: "https://youtu.be/hDZ7y8RP5HE?si=AoaarE_wPQMw1aYp" },
  { title: "Sonic the Hedgehog 3", rating: "9.0", image: "https://resizing.flixster.com/5yCDU3YndW2EIWaEwH1FydaMwZI=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2E0MGM5YTk5LTdhY2UtNGYzNS04NGVmLTJlNjRkYjljNjQ4ZS5qcGc=", trailer: "https://youtu.be/qSu6i2iFMO0?si=Ui28n2NPV045lwAR" },
  { title: "Mufasa: The Lion King", rating: "9.2", image: "https://m.media-amazon.com/images/I/A1z543w2WVL._AC_UF1000,1000_QL80_.jpg", trailer: "https://youtu.be/o17MF9vnabg?si=nLlfM8S-fLDZHet8" },
];

const TrendingMovies = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="trending-section">
      <h2 data-aos="fade-up">Trending Movies</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          900: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          300: { slidesPerView: 1 }
        }}
      >
        {trendingMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="movie-card" data-aos="fade-up">
              <img src={movie.image} alt={movie.title} />
              <div className="overlay" data-aos="fade-up" data-aos-delay="200">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.rating}</p>
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="watch-btn">
                  ▶ Watch Trailer
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingMovies;
