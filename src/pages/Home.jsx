import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingMovies from '../components/TrendingMovies';
import TheatreInfo from '../components/TheatreInfo';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero />
      <TrendingMovies />
      <TheatreInfo />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
