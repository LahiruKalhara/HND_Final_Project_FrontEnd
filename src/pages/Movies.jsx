import React from 'react';
import Header from '../components/Header';
import MovieHero from '../components/MovieHero';
import NowPremiering from '../components/NowPremiering';
import UpcomingMovies from '../components/UpcomingMovies';
import Footer from '../components/Footer';
import LatestMovies from '../components/LatestMovies';

const Movies = () => {
  return (
    <div>
      <Header />
      <MovieHero />
      <NowPremiering />
      <LatestMovies />
      <UpcomingMovies/>
      <Footer />
    </div>
  );
};

export default Movies;
