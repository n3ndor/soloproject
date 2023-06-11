import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Welcome from './components/sections/Welcome';
import Maps from './components/sections/Maps';
import Weapons from './components/sections/Weapons';
import Extras from './components/sections/Extras';
import Contact from './components/sections/Contact';
import NewBooking from './components/NewBooking';
import OldBookings from './components/OldBookings';
import { Element } from 'react-scroll';
import UserContext from './components/UserContext';

function App() {

  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, userToken, setUserToken }}>
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
            <Route path="/old-bookings" element={<OldBookings />} />

          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider >
  );
}

export default App;
