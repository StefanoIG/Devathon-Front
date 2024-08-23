

const Header = () => (
  <header className="header">
    <nav>
      <ul className="navbar">
      <li className='navbar-item'><a href="/">Home</a></li>
          <li className='navbar-item'><a href="/reservation">Reservar</a></li>
          <li className='navbar-item'><a href="/login">Registro / Iniciar sesión</a></li>
          <li className='navbar-item'><a href="/payment-gateway">Pasarela de pagos</a></li>
          <li className='navbar-item'><a href='/payment-receipt'>Recibos de pagos</a></li>
          <li className='navbar-item'><a href='#cuenta-de-usuario'>Cuenta de usuario</a></li>
          <li className='navbar-item'><a href='#pas'>Administración</a></li>    
      </ul>
    </nav>
  </header>
);

export default Header;
/*
import { Link } from 'react-router-dom';

        <li><Link to="/">Home</Link></li>
        <li><Link to="/reservation">Reservar</Link></li>
        <li><Link to="/login">Registro / Iniciar sesión</Link></li>
        <li><Link to="/PaymentGateway">Pasarela de pagos</Link></li>
        <li><Link to="/PaymentReceipt">Recibos de pagos</Link></li>
        <li><Link to="/UserProfile"> Cuenta de usuario</Link></li>




*/