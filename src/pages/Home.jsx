import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingMovies from '../components/TrendingMovies';

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero />
      <TrendingMovies />
    </div>
  );
};

export default Home;
