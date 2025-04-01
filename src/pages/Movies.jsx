import React from 'react';
import Header from '../components/Header';
import MovieHero from '../components/MovieHero';
import NowPremiering from '../components/NowPremiering';
import UpcomingMovies from '../components/UpcomingMovies';
import Footer from '../components/Footer';

const Movies = () => {
  return (
    <div>
      <Header />
      <MovieHero />
      <NowPremiering />
      <UpcomingMovies/>
      <Footer />
    </div>
  );
};

export default Movies;
