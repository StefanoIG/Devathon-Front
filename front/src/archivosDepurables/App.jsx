import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Login from './views/Login';
import Reservation from './views/Reservation';
import UserProfile from './views/UserProfile';
import PaymentReceipt from './views/PaymentReceipt';
import PaymentGateway from './views/PaymentGateway';

import Footer from './components/Footer';
import './login.css';

const App = () => (
  <Router>
    <Header />
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/PaymentGateway" element={<PaymentGateway/>} />
        <Route path="/PaymentReceipt" element={<PaymentReceipt/>} />  
        <Route path="/UserProfile" element={<UserProfile/>} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
