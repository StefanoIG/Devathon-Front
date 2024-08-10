import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChair, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Reserva = () => {
  const [mesas, setMesas] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/mesas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMesas(data);
        } else {
          console.error('Error al obtener las mesas');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMesas();
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Reserva de Mesas</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Reservas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="container mt-5">
        <div className="row">
          {mesas.map((mesa) => (
            <div key={mesa.id} className="col-md-4 col-lg-3 mb-4">
              <div className={`card text-center p-3 shadow-sm ${mesa.estado === 'disponible' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                <div className={`rounded-circle mx-auto mb-3 mesa-numero d-flex align-items-center justify-content-center ${mesa.estado}`} style={{ width: '80px', height: '80px', color: 'white' }}>
                  <FaChair size={40} />
                </div>
                <h5 className="card-title">Mesa {mesa.numero}</h5>
                <p className="card-text">
                  {mesa.estado === 'disponible' ? <FaCheckCircle /> : <FaTimesCircle />} {mesa.estado}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <div className="container">
          <p>&copy; 2024 Reserva de Mesas. Todos los derechos reservados.</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#" className="text-white">Política de Privacidad</a></li>
            <li className="list-inline-item"><a href="#" className="text-white">Términos de Servicio</a></li>
            <li className="list-inline-item"><a href="#" className="text-white">Contacto</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Reserva;