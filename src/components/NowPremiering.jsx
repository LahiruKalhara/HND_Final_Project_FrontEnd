import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "aos/dist/aos.css"; 
import AOS from "aos";
import "./NowPremiering.css"; 

const NowPremiering = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Initialize navigation function

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
    <div className="now-premiering-container">
      <h2 className="now-premiering-title" data-aos="fade-up">Now Premiering</h2>
      <Swiper
        grabCursor={true}
        slidesPerView={3}  
        centeredSlides={true}
        spaceBetween={20} 
        loop={true}
        autoplay={{ 
          delay: 2500, 
          disableOnInteraction: false,
          waitForTransition: false 
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
        className="now-premiering-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movieID} className="now-premiering-slide">
            <div className="now-premiering-card" data-aos="zoom-in">
              <img src={movie.movieUrl} alt={movie.movieName} className="now-premiering-image" />
              <div className="now-premiering-overlay">
                <h3 className="now-premiering-movie-title" data-aos="fade-up">{movie.movieName}</h3>
                <p className="now-premiering-description" data-aos="fade-up">{movie.description}</p>
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
