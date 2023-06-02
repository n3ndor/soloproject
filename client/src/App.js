import React from 'react';
import './App.css';
import NavBar from './components/Navbar';
import CarouselComponent from './components/Carousel';
import Maps from './components/Maps';
import Weapons from './components/Weapons';
import Extras from './components/Extras';

function App() {
  return (
    <div className="App bg">
      <NavBar />
      <CarouselComponent />
      <Maps />
      <Weapons />
      <Extras />
    </div>
  );
}

export default App;
