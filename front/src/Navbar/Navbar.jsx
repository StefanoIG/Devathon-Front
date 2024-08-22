import './Navbar.css';

const Navbar = () => {
  return (
    <header className='navbar-main'>
      
      <nav className='navbar'>
        <a href='' className='navbar-logo'>
          {/* Logo */}
            <img className='logo' src='/logo.png' alt='logo' />
        </a>

       
        <ul className='navbar-menu'>
        
          <li className='navbar-item'><a href='#home'>Home</a></li>
          <li className='navbar-item'><a href='#reservas'>Reservas</a></li>
          <li className='navbar-item'><a href='#'>Cerrar sesion</a></li>
          <li className='navbar-item'><a href='#'>Mis facturas</a></li>
          <li className='navbar-item'><a href='#'>Mi perfil</a></li>
        </ul>
      </nav>
    </header>
  );
};

export { Navbar };

