import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    correo_electronico: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Guardar los tokens en el localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });

        // Lógica adicional después del inicio de sesión exitoso
        // Por ejemplo, redirigir a la siguiente vista
         window.location.href = '/reserva';

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión!',
          text: 'Correo electrónico o contraseña incorrectos.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputLabel: 'Ingrese su correo electrónico',
      inputPlaceholder: 'correo@ejemplo.com',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return fetch('http://127.0.0.1:8000/api/password_reset/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Solicitud fallida: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado!',
          text: 'Por favor, revisa tu correo electrónico para recuperar tu contraseña.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-5 col-xl-4 w-100 p-3">
        <h2 className="text-center mb-4">Inicio de Sesión</h2>
        <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm">
          <div className="form-group mb-3">
            <label htmlFor="correo_electronico">Correo Electrónico</label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              className="form-control"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
          <div className="text-center">
            <a href="#!" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
            <br />
            <a href="/register" >¿Eres nuevo? <strong>Registrate</strong></a>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
