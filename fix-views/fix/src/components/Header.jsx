import React from 'react';

const Header = () => {
  const isLoggedIn = !!sessionStorage.getItem('access_token');

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    window.location.href = '/auth';
  };

  return (
    <header className="header">
      <nav>
        <ul className="navbar">
          {/* Logo */}
          <li className='navbar-item logo-container'>
            <a href="/">
              <img className="logo" src='/logo.png' alt='logo'/>
            </a>
          </li>
          <li className='navbar-item'><a href="/">Home</a></li>
          <li className='navbar-item'><a href="/reservation">Reservar</a></li>
          
          <li className='navbar-item'><a href='/payment-receipt'>Recibos de pagos</a></li>
          <li className='navbar-item'><a href='/reservas-list'>Mis reservas</a></li>
          {isLoggedIn ? (
            <li className='navbar-item'>
              <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </li>
          ) : (
            <li className='navbar-item'><a href="/auth">Registro / Iniciar sesión</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;