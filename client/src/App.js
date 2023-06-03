// App.js
import React from 'react';
import './App.css';
import NavBar from './components/Navbar';
import CarouselComponent from './components/Carousel';
import Maps from './components/Maps';
import Weapons from './components/Weapons';
import Extras from './components/Extras';
import { Element } from 'react-scroll';

function App() {
  return (
    <div className="App bg">
      <NavBar />
      <Element name="carousel" className="element">
        <CarouselComponent />
      </Element>
      <Element name="maps" className="element">
        <Maps />
      </Element>
      <Element name="weapons" className="element">
        <Weapons />
      </Element>
      <Element name="extras" className="element">
        <Extras />
      </Element>
    </div>
  );
}

export default App;
