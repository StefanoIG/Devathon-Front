import swal from 'sweetalert2';
import { useState } from 'react';
import Swal from 'sweetalert2';


const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);




  const handleTabClick = (tab) => {

    setActiveTab(tab);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const correo_electronico = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('refresh_token', data.refresh);
      swal.fire('Inicio de sesión exitoso.');
      //redirigir al usuario en 30 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);      
    } catch (error) {
      console.error('Error:', error);
      swal.fire('Error al iniciar sesión.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    // Obtén los valores de los campos del formulario
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const correo_electronico = e.target.correo_electronico.value;
    const password = e.target.password.value;
  
    // Prepara el cuerpo de la solicitud
    const requestBody = {
      nombre,
      apellido,
      correo_electronico,
      password,
    };
  
    try {
      // Realiza la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api/v1/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Maneja la respuesta de la API
      if (response.ok) {
        const data = await response.json();
        Swal.fire('Éxito', 'Registro exitoso.', 'success');
        // Opcional: Redirige al usuario o limpia el formulario
        navigate('/auth');

      } else {
        // Maneja errores si la respuesta no es OK
        const errorData = await response.json();
        Swal.fire('Error', errorData.error || 'No se pudo completar el registro.', 'error');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      Swal.fire('Error', 'Ocurrió un error al intentar registrar.', 'error');
    }
  };
  

  const handleTermsClick = () => {
    Swal.fire({
      title: 'Términos y Condiciones',
      html: `
        <h3>Términos y Condiciones del Servicio</h3>
        <p><strong>1. Introducción</strong></p>
        <p>Bienvenido a [Nombre del Comedor]. Estos términos y condiciones rigen el uso de nuestros servicios y el acceso a nuestras instalaciones. Al hacer una reserva o utilizar nuestros servicios, usted acepta estos términos y condiciones en su totalidad.</p>
        
        <p><strong>2. Reservas</strong></p>
        <p>Las reservas deben realizarse con al menos [X] horas de anticipación. Las reservas para grupos grandes deben ser confirmadas por nuestro equipo. No garantizamos la disponibilidad de mesas sin una reserva previa.</p>
        
        <p><strong>3. Cancelaciones</strong></p>
        <p>Para cancelar una reserva, debe hacerlo al menos [Y] horas antes de la hora de la reserva. Las cancelaciones tardías pueden estar sujetas a cargos.</p>
        
        <p><strong>4. Horario de Atención</strong></p>
        <p>El comedor está abierto de [Hora de Apertura] a [Hora de Cierre]. Nos reservamos el derecho de cerrar antes de la hora establecida si no hay clientes.</p>
        
        <p><strong>5. Política de Pagos</strong></p>
        <p>Todos los pagos deben realizarse en el momento de la visita. Aceptamos efectivo y tarjetas de crédito/débito. Los cheques no están aceptados.</p>
        
        <p><strong>6. Conducta en el Comedor</strong></p>
        <p>Se espera que todos los clientes se comporten de manera respetuosa hacia el personal y otros clientes. Nos reservamos el derecho de pedir a cualquier cliente que se comporte de manera inapropiada que abandone nuestras instalaciones.</p>
        
        <p><strong>7. Responsabilidad</strong></p>
        <p>No somos responsables por la pérdida o daño de pertenencias personales mientras se encuentren en nuestras instalaciones. Los clientes son responsables de cualquier daño causado a la propiedad del comedor.</p>
        
        <p><strong>8. Modificaciones a los Términos</strong></p>
        <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas tan pronto como se publiquen en nuestro sitio web o se comuniquen a los clientes.</p>
        
        <p><strong>9. Contacto</strong></p>
        <p>Para cualquier pregunta o comentario sobre estos términos y condiciones, por favor contáctenos en [correo electrónico] o [número de teléfono].</p>
        
        <p><strong>10. Aceptación de los Términos</strong></p>
        <p>Al hacer una reserva o utilizar nuestros servicios, usted acepta que ha leído, entendido y aceptado estos términos y condiciones.</p>
      `,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };
  

  const handelRecoveryPassword = (e) => {
    e.preventDefault();
    // Swal pidiendo el correo electronico
    swal.fire({
      title: 'Recuperar Contraseña',
      text: 'Ingrese su correo electronico',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recuperar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        // Hacer fetch a http://127.0.0.1:8000/api/password_reset/ con el metodo post
        return fetch('http://127.0.0.1:8000/api/password_reset/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email}),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(data => {
            // Mostrar Swal de éxito
            swal.fire({
              icon: 'success',
              title: 'Correo enviado',
              text: 'Se ha enviado un correo para recuperar su contraseña.',
            });
          })
          .catch(error => {
            swal.showValidationMessage(
              `Request failed: ${error}`
            );
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formErrors };

    if (name === 'nombre' || name === 'apellido') {
      if (/\d/.test(value)) {
        errors[name] = 'No se permiten números';
      } else {
        delete errors[name];
      }
    }

    if (name === 'telefono') {
      if (value < 0) {
        errors[name] = 'No se permiten números negativos';
      } else {
        delete errors[name];
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        errors[name] = 'La contraseña debe tener al menos 8 caracteres';
      } else {
        delete errors[name];
      }
    }

    setFormErrors(errors);
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
            <form className="form-login" onSubmit={handleLoginSubmit}>
              <label htmlFor="username">Correo Electronico:</label>
              <input type="text" id="username" name="username" required />
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
              <div className="form-group">
                <label onClick={handelRecoveryPassword}  >¿Olvidaste tu Contraseña?</label>
              </div>
              <button type="submit" className="button">Iniciar Sesión</button>
            </form>
          </section>
        )}
        {activeTab === 'register' && (
          <section id="register" className="tab-section active">
            <form className="form-register" onSubmit={handleRegisterSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" onInput={handleInputChange} required />
                  {formErrors.nombre && <p className="error">{formErrors.nombre}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido:</label>
                  <input type="text" id="apellido" name="apellido" onInput={handleInputChange} required />
                  {formErrors.apellido && <p className="error">{formErrors.apellido}</p>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input type="number" id="telefono" name="telefono" onInput={handleInputChange} required />
                {formErrors.telefono && <p className="error">{formErrors.telefono}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="correo_electronico">Correo Electrónico:</label>
                <input type="email" id="correo_electronico" name="correo_electronico" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="password-container">
                    <input type={passwordVisible ? 'text' : 'password'} id="password" name="password" onInput={handleInputChange} required />
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  {formErrors.password && <p className="error">{formErrors.password}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="repeat_password">Repetir Contraseña:</label>
                  <div className="password-container">
                    <input type={repeatPasswordVisible ? 'text' : 'password'} id="repeat_password" name="repeat_password" onInput={handleInputChange} required />
                    <button type="button" onClick={() => setRepeatPasswordVisible(!repeatPasswordVisible)}>
                      {repeatPasswordVisible ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  {formErrors.repeat_password && <p className="error">{formErrors.repeat_password}</p>}
                </div>
              </div>
              <div className="form-group form-group-checkbox">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms" onClick={handleTermsClick}>Acepto los <span>términos y condiciones</span></label>
              </div>
              <div className="form-group form-group-checkbox">
                <input type="checkbox" id="newsletter" name="newsletter" />
                <label htmlFor="newsletter">Deseo recibir noticias y promociones</label>
              </div>
              <button type="submit" className="button">Registrarse</button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default TabContainer;