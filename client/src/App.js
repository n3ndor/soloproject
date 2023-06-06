import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Welcome from './components/Welcome';
import Maps from './components/Maps';
import Weapons from './components/Weapons';
import Extras from './components/Extras';
import Contact from './components/Contact';
import NewBooking from './components/NewBooking';
import { Element } from 'react-scroll';

function App() {
  return (
    <BrowserRouter>
      <div className="App bg">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <Element name="welcome" className="element">
                <Welcome />
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
              <Element name="contact" className="element">
                <Contact />
              </Element>
            </>
          } />
          <Route path="/new-booking" element={<NewBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
