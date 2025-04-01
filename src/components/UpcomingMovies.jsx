import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "aos/dist/aos.css"; 
import AOS from "aos"; 
import "./UpcomingMovies.css"; 

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies/View")
      .then((response) => {
        const upcomingMovies = response.data.filter(movie => movie.status === "Upcoming");
        setMovies(upcomingMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="upcoming-movies-container">
      <h2 className="upcoming-movies-title" data-aos="fade-up">Upcoming Movies</h2>
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
        className="upcoming-movies-slider"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movieID} className="upcoming-movies-slide">
            <div className="upcoming-movies-card" data-aos="zoom-in">
              <img src={movie.movieUrl} alt={movie.movieName} className="upcoming-movies-image" />
              <div className="upcoming-movies-overlay">
                <h3 className="upcoming-movies-movie-title" data-aos="fade-up">{movie.movieName}</h3>
                <p className="upcoming-movies-description" data-aos="fade-up">{movie.description}</p>
                <button className="upcoming-movies-book-btn" data-aos="fade-up">View Trailer</button> 
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingMovies;
