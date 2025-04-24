import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import './MovieHero.css';
import { Link } from 'react-router-dom';

const MovieHero = () => {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        axios.get('http://localhost:8080/api/movies/View')
            .then((response) => {
                setMovie(response.data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-hero">
            <div className="movie-hero-content" style={{ backgroundImage: `url(${movie.movieUrl})` }} data-aos="fade-up">
                <div className="movie-hero-overlay">
                    <div className="movie-hero-info">
                        <h1 data-aos="fade-up" data-aos-delay="200" className="movie-title">
                            {movie.movieName}
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="400">{movie.description}</p>
                        <p className="movie-details" data-aos="fade-up" data-aos-delay="600">
                            <strong>Genre:</strong> {movie.movieType} |
                            <strong> Director:</strong> {movie.movieDirector} |
                            <strong> Rating:</strong> {movie.rating} |
                            <strong> Language:</strong> {movie.language}
                        </p>

                        <div className="cta-buttons">
                            <button className="cta-button" data-aos="fade-up" data-aos-delay="800">
                                <Link to={`/booking?movieID=${movie.movieID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Book Now
                                </Link>
                            </button>
                            <button className="cta-button" data-aos="fade-up" data-aos-delay="1000">Watch Trailer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieHero;
