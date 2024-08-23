import React, { useEffect, useState } from 'react';
import './ReservasList.css';
import swal from 'sweetalert2';
import TokenAlert from '../components/TokenAlert';
const ReservasList = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = sessionStorage.getItem('access_token'); // Obtén el token del sessionStorage

        if (!token) {
          throw new Error('Token not found in sessionStorage');
        }

        const response = await fetch('http://127.0.0.1:8000/api/v1/reservaAll/reservas/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        setReservas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReservas();
  }, []);

  const handleCancel = (id) => {
    swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cancelar la reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // top-end con toast true diciendo que esta funcion aun no esta implementada
          swal.fire({
            title: 'Función no implementada',
            text: 'Esta función aún no está implementada',
            icon: 'info',
            toast: true,
            position: 'top-end',
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true
          });
        } catch (error) {
          console.error('Error:', error);
          swal.fire('Error', 'Hubo un problema al cancelar la reserva', 'error');
        }
      }
    });
  };

  return (
    <div className="reservas-list">
    <TokenAlert />

      <h1>Lista de Reservas</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Mesa</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.fecha_reserva}</td>
                <td>{reserva.mesa.numero}</td> {/* Accede a la propiedad 'numero' del objeto 'mesa' */}
                <td>{reserva.hora_reserva}</td>
                <td>{reserva.estado}</td>
                <td>
                  {reserva.estado === 'pendiente' && (
                    <button className="cancel-button" onClick={() => handleCancel(reserva.id)}>
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservasList;