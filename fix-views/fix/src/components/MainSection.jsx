import React, { useEffect, useState } from 'react';
import './MainSection.css';

const MainSection = () => {
  const [facturas, setFacturas] = useState([]);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchFacturas = async (url = 'http://127.0.0.1:8000/api/v1/mis-facturas/') => {
    try {
      const token = sessionStorage.getItem('access_token'); // Obtén el token del sessionStorage

      if (!token) {
        throw new Error('Token not found in sessionStorage');
      }

      // Agregar parámetros de filtro a la URL
      const params = new URLSearchParams();
      if (selectedDate) {
        params.append('fecha_vencimiento', selectedDate);
      }
      const fetchUrl = `${url}?${params.toString()}`;

      const response = await fetch(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setFacturas(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFacturas();
  }, [selectedDate]);

  const handleDownload = async (reservaId) => {
    try {
      const url = `http://127.0.0.1:8000/api/v1/descargar-factura/${reservaId}/`;
      const token = sessionStorage.getItem('access_token'); // Obtén el token del sessionStorage

      if (!token) {
        throw new Error('Token not found in sessionStorage');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = `factura_${reservaId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error al descargar la factura:', error);
    }
  };

  const handlePagination = (url) => {
    fetchFacturas(url);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <main className='main-container2'>
      <section className='invoices-section'>
        <div className='invoices-left'>
          <h2>Mis facturas</h2>
        </div>
        {/* <div className='invoices-center'>
          <h2>Filtrar por fecha</h2>
          <input type='date' className='date-input' value={selectedDate} onChange={handleDateChange} disabled/>
        </div> */}
      </section>

      <div className='cards-container'>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          facturas.map((factura) => (
            <div className='card' key={factura.id}>
              <p>Factura del dia:</p>
              <input type='date' className='date-input' value={factura.fecha_vencimiento} readOnly />
              <button className='download-button' onClick={() => handleDownload(factura.reserva)}>Descargar</button>
            </div>
          ))
        )}
      </div>
      <div className='pagination'>
        {prevPage && <button onClick={() => handlePagination(prevPage)}>Anterior</button>}
        {nextPage && <button onClick={() => handlePagination(nextPage)}>Siguiente</button>}
      </div>
    </main>
  );
};

export default MainSection;