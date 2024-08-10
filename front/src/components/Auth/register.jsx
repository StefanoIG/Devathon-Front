import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './Register.css'; // Asegúrate de crear este archivo CSS


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    telefono: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (/[^a-zA-Z\s]/.test(formData.nombre)) {
      isValid = false;
      errors.nombre = 'El nombre no debe contener números ni caracteres especiales.';
    }

    if (/[^a-zA-Z\s]/.test(formData.apellido)) {
      isValid = false;
      errors.apellido = 'El apellido no debe contener números ni caracteres especiales.';
    }

    if (formData.telefono < 0) {
      isValid = false;
      errors.telefono = 'El teléfono no puede ser un número negativo.';
    }

    if (isNaN(formData.telefono)) {
      isValid = false;
      errors.telefono = 'El teléfono no puede llevar letras.';
    }

    if (formData.password.length < 10 || !/[!@#$%^&*]/.test(formData.password)) {
      isValid = false;
      errors.password = 'La contraseña debe tener al menos 10 caracteres e incluir un carácter especial.';
    }

    if (formData.password !== formData.repeatPassword) {
      isValid = false;
      errors.repeatPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, corrige los errores en el formulario.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido!',
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

  return (
    <div className="justify-content-center align-items-center">
      <div className="col-md-8 col-lg-6 w-100 p-3">
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow-sm">
          <div className="form-group mb-3">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
          </div>
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
          <div className="form-group mb-3">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="repeatPassword">Repetir Contraseña</label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className={`form-control ${errors.repeatPassword ? 'is-invalid' : ''}`}
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
            {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
