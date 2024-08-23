import React, { useEffect, useState } from 'react';
import './ReservarEmpleado.css';
import Swal from 'sweetalert2';

const ReservasEmpleado = () => {
  const [reservas, setReservas] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      // Obtener reservas
      fetch('http://127.0.0.1:8000/api/v1/listar-reservas/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación o en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        const today = new Date().toISOString().split('T')[0];
        const reservasFuturas = data.filter(reserva => reserva.fecha_reserva >= today);
        setReservas(reservasFuturas);
      })
      .catch(error => console.error('Error fetching reservas:', error));

      // Obtener facturas
      fetch('http://127.0.0.1:8000/api/v1/mis-facturas/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación o en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.results)) {
          setFacturas(data.results);
        } else {
          console.error('La respuesta de facturas no contiene un array results:', data);
        }
      })
      .catch(error => console.error('Error fetching facturas:', error));

      // Obtener clientes
      fetch('http://127.0.0.1:8000/api/v1/clientes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la autenticación o en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Dado que data es un array directamente en lugar de un objeto con 'results'
        if (Array.isArray(data)) {
            setClientes(data);
        } else {
            console.error('La respuesta de clientes no es un array:', data);
        }
    })
    
      .catch(error => console.error('Error fetching clientes:', error));
    }
  }, []);

  const handleConfirmar = (id) => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      Swal.fire('Error', 'No se encontró el token de autenticación', 'error');
      return;
    }

    fetch('http://127.0.0.1:8000/api/v1/confirmar-reserva/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ reserva_id: id })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Reserva confirmada exitosamente.") {
        Swal.fire('Éxito', data.message, 'success');
        setReservas(prevReservas => prevReservas.map(reserva => 
          reserva.id === id ? { ...reserva, estado: 'confirmada' } : reserva
        ));
      } else {
        console.error('Respuesta inesperada al confirmar reserva:', data);
        Swal.fire('Error', 'No se pudo confirmar la reserva', 'error');
      }
    })
    .catch(error => {
      console.error('Error confirmando la reserva:', error);
      Swal.fire('Error', 'Ocurrió un error al confirmar la reserva', 'error');
    });
  };

  const handleCancelar = (id) => {
    console.log(`Cancelar reserva con ID: ${id}`);
  };

  const handleProcederPago = (id) => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      Swal.fire('Error', 'No se encontró el token de autenticación', 'error');
      return;
    }

    Swal.fire({
      title: 'Ingrese el monto total a pagar',
      input: 'number',
      inputAttributes: {
        min: '0',
        step: '0.01'
      },
      inputPlaceholder: 'Monto total',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value || parseFloat(value) <= 0) {
          return 'Por favor ingrese un monto válido mayor que 0';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const montoTotal = parseFloat(result.value);

        fetch('http://127.0.0.1:8000/api/v1/confirmar-factura/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ reserva_id: id, monto_total: montoTotal })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta al confirmar factura:', data);
          if (data.message === "Factura confirmada exitosamente.") {
            Swal.fire('Éxito', data.message, 'success');
          } else {
            console.error('Respuesta inesperada al confirmar factura:', data);
            Swal.fire('Error', 'No se pudo confirmar la factura', 'error');
          }
        })
        .catch(error => {
          console.error('Error confirmando la factura:', error);
          Swal.fire('Error', 'Ocurrió un error al confirmar la factura', 'error');
        });
      }
    });
  };

  const getFacturaStatus = (reservaId) => {
    if (Array.isArray(facturas)) {
      const factura = facturas.find(factura => factura.reserva === reservaId);
      return factura ? factura.estado : 'No disponible';
    }
    return 'No disponible';
  };

  const handleCrearReserva = () => {
    const today = new Date().toISOString().split('T')[0];

    Swal.fire({
      title: 'Crear Reserva',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Número de Mesa (ID)">
        <input id="swal-input2" type="date" class="swal2-input" min="${today}" placeholder="Fecha">
        <input id="swal-input3" type="time" class="swal2-input" placeholder="Hora">
        <select id="swal-input4" class="swal2-input">
          ${clientes.map(cliente => `<option value="${cliente.id}">${cliente.nombre}</option>`).join('')}
        </select>
      `,
      
      confirmButtonText: 'Crear Reserva',
      focusConfirm: false,
      preConfirm: () => {
        const mesaId = document.getElementById('swal-input1').value;
        const fecha = document.getElementById('swal-input2').value;
        const hora = document.getElementById('swal-input3').value += ':00';
        const clienteId = document.getElementById('swal-input4').value;
        if (!mesaId || !fecha || !hora || !clienteId) {
          Swal.showValidationMessage('Por favor complete todos los campos');
        } else if (new Date(fecha + 'T' + hora) < new Date()) {
          Swal.showValidationMessage('La fecha y hora no pueden ser pasadas');
        } else {
          return {
            mesa_id: mesaId,
            fecha_reserva: fecha,
            hora_reserva: hora ,
            cliente_id: clienteId
          };

        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { mesa_id, fecha_reserva, hora_reserva, cliente_id } = result.value;

        const token = sessionStorage.getItem('access_token');
        if (!token) {
          Swal.fire('Error', 'No se encontró el token de autenticación', 'error');
          return;
        }

        fetch('http://127.0.0.1:8000/api/v1/crear-reserva', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            mesa_id,
            fecha_reserva,
            hora_reserva ,
            cliente_id
            
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data) {
            Swal.fire('Éxito', data.message, 'success');
            // Opcional: Refrescar las reservas
            setReservas(prevReservas => [...prevReservas, data.reserva]);
          } else {
            console.error('Respuesta inesperada al crear reserva:', data);
            Swal.fire('Error', 'No se pudo crear la reserva', 'error');
          }
        })
        .catch(error => {
          console.error('Error creando la reserva:', error);
          Swal.fire('Error', 'Ocurrió un error al crear la reserva', 'error');
        });
      }
    });
  };

  return (
    <div>
      <h2>Reservas Próximas</h2>
      <button onClick={handleCrearReserva}>Crear Reserva</button>
      <table className="table-employee">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Empleado</th>
            <th>Mesa</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado Reserva</th>
            <th>Estado Factura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length > 0 ? (
            reservas.map(reserva => {
              const facturaEstado = getFacturaStatus(reserva.id);
              return (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cliente}</td>
                  <td>{reserva.empleado ? reserva.empleado : 'Empleado no asignado'}</td>
                  <td>{`Mesa ${reserva.mesa.numero} (Capacidad: ${reserva.mesa.capacidad})`}</td>
                  <td>{reserva.fecha_reserva}</td>
                  <td>{reserva.hora_reserva}</td>
                  <td>{reserva.estado}</td>
                  <td>{facturaEstado}</td>
                  <td>
                    {facturaEstado === 'PAGADA' ? (
                      <span>Factura Pagada</span>
                    ) : (
                      <>
                        {reserva.estado !== 'confirmada' && (
                          <>
                            <button onClick={() => handleConfirmar(reserva.id)}>Confirmar</button>
                            <button onClick={() => handleCancelar(reserva.id)}>Cancelar</button>
                          </>
                        )}
                        {reserva.estado === 'confirmada' && (
                          <button onClick={() => handleProcederPago(reserva.id)}>Proceder al Pago</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No hay reservas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasEmpleado;
