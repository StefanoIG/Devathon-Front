
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => (
  <header className="header">
    <nav>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reservation">Reservar</Link></li>
        <li><Link to="/login">Registro / Iniciar sesión</Link></li>     
        <li><Link to="/PaymentGateway">Pasarela de pagos</Link></li>
        <li><Link to="/PaymentReceipt">Recibos de pagos</Link></li>
        <li><Link to="/UserProfile"> Cuenta de usuario</Link></li>     
        <li><Link to="/Mapa"> Mapa</Link></li>     
      </ul>
    </nav>
  </header>
);

export default Header;
