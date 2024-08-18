import './Hero.css';

const Hero = () => {
  return (
    <header className='hero'>
      <nav className='navbar'>
        <ul className='navbar-menu'>
          <li className='navbar-item'><a href='#home'>Home</a></li>
          <li className='navbar-item'><a href='#reservas'>Reservas</a></li>
          <li className='navbar-item'><a href='#registro'>Registro</a></li>
          <li className='navbar-item'><a href='#iniciar-sesion'>Iniciar sesión</a></li>
          <li className='navbar-item'><a href='#pasarela-de-pagos'>Pasarela de pagos</a></li>
          <li className='navbar-item'><a href='#recibos-de-pagos'>Recibos de pagos</a></li>
          <li className='navbar-item'><a href='#cuenta-de-usuario'>Cuenta de usuario</a></li>
          <li className='navbar-item'><a href='#pas'>Password</a></li>
        </ul>
      </nav>
    </header>
  );
};

export { Hero };

