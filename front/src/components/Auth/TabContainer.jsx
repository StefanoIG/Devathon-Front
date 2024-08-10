import React, { useState } from 'react';

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    localStorage.setItem('login', JSON.stringify({ username, password }));
    alert('Datos de inicio de sesión guardados.');
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const role = event.target.role.value;
    localStorage.setItem('register', JSON.stringify({ username, password, role }));
    alert('Datos de registro guardados.');
  };


  return (
    <div className="tab-container">
      <ul className="tab-menu">
        <li className={`tab-item ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}>
          Iniciar Sesión
        </li>
        <li className={`tab-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => handleTabClick('register')}>
          Registrarse
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 'login' && (
          <section id="login" className="tab-section active">
            {/* <h2>Iniciar Sesión</h2> */}
            <form className="form-login" onSubmit={handleLoginSubmit}>
              <label htmlFor="username">Usuario:</label>
              <input type="text" id="username" name="username" required />
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
              <button type="submit" className="button">Iniciar Sesión</button>
            </form>
          </section>
        )}
        {activeTab === 'register' && (
          <section id="register" className="tab-section active">
            {/* <h2>Registrarse</h2> */}
            <form className="form-register" onSubmit={handleRegisterSubmit}>
              <label htmlFor="username">Usuario:</label>
              <input type="text" id="username" name="username" required />
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
              <label htmlFor="role">Rol:</label>
              <select id="role" name="role" required>
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="employee">Empleado</option>
                <option value="other">Otro</option>
              </select>
              <button type="submit" className="button">Registrarse</button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default TabContainer;
