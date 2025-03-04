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
    <div>
      
    </div>
  );
};

export default NowPremiering;
