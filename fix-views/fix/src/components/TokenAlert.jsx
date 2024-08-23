import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const TokenAlert = () => {
  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'Sesión no iniciada',
          text: 'Por favor, inicie sesión.',
          showCancelButton: false,
          confirmButtonText: 'Iniciar Sesión',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/auth';
          }
        });
      } else {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/clientes/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Token inválido');
          }

          // Si la respuesta es correcta, el token es válido
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Sesión expirada',
            text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
            showCancelButton: false,
            confirmButtonText: 'Iniciar Sesión',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/auth';
            }
          });
          sessionStorage.removeItem('access_token');
        }
      }
    };

    checkToken();

    const intervalId = setInterval(() => {
      checkToken();
    }, 120000); // 2 minutos

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default TokenAlert;