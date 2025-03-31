import React from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Menu from '../Menu/Menu';
import Specials from '../Specials/Specials';
import Reservation from '../Reservation/Reservation';
import Testimonials from '../Testimonials/Testimonials';
import Gallery from '../Gallery/Gallery';
import Events from '../Events/Events';
import useAOS from '../../hooks/useAOS';

const AppMain = () => {
  useAOS();
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Specials />
      <Reservation />
      <Testimonials />
      <Gallery />
      <Events />
    </>
  );
};

export default AppMain;