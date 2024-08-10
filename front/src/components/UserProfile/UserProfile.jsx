import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    reservas: []
  });
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Información actualizada correctamente');
      } else {
        console.error('Error al actualizar la información del usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Perfil de Usuario</h2>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={user.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Correo</label>
        <input
          type="email"
          className="form-control"
          name="correo"
          value={user.correo}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          name="contrasena"
          value={user.contrasena}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Actualizar Información</button>

      <h3 className="mt-5">Reservas</h3>
      <ul className="list-group">
        {user.reservas.map((reserva) => (
          <li key={reserva.id} className="list-group-item">
            Mesa {reserva.mesa.numero} - {reserva.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;