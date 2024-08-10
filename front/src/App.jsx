import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/register';
import Login from './components/Auth/login';
/* import Reserva from './components/Reserva/Reserva.jsx'; */
import Reservation from './components/Reserva/Reservation.jsx';
import UserProfile from './components/UserProfile/UserProfile';
import Header from './components/Navigation/Header.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Navigation/Footer.jsx'
import Mapa from './components/Navigation/mapa.jsx'
function App() {
  return (
    <Router>
          <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       {/*  <Route path="/reserva" element={<Reserva />} /> */}
        <Route path="/reservation" element={<Reservation />} /> 
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/Mapa" element={<Mapa />} />

        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;