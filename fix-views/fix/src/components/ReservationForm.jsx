const ReservationForm = () => {
  const handleReservationSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('reservation', JSON.stringify(data));
    alert('Datos de reservación guardados.');
  };

  return (
    <form id="reserva-form" onSubmit={handleReservationSubmit}>
      <section className="reservation-details">
        {/* <h2>Detalles de la Reserva</h2> */}
        <fieldset>
          <label htmlFor="reservation-date">Fecha de la Reserva:</label>
          <input type="date" id="reservation-date" name="reservation-date" required />
          <label htmlFor="num-hours">Número de Horas de Estadía:</label>
          <input type="number" id="num-hours" name="num-hours" min="1" max="12" required />
        </fieldset>  

        <fieldset>
          <label htmlFor="card-number">Número de Tarjeta:</label>
          <input type="text" id="card-number" name="card-number" required pattern="\d{16}" placeholder="1234 5678 9101 1121" />
          <label htmlFor="num-persons">Número de Personas:</label>
          <input type="number" id="num-persons" name="num-persons" min="1" max="20" required />

        </fieldset>
        <fieldset>
          <label htmlFor="dish">Platillo:</label>
          <input type="text" id="dish" name="dish" />
          <label htmlFor="quantity">Cantidad:</label>
          <input type="number" id="quantity" name="quantity" />
        </fieldset>

      </section>
      <div className="decoration">
        <div>Entrada</div>
        <div>Recibidor-Caja</div>
        <div>Sanitarios</div>
      </div>
      <section className="grid-container">
        {[...Array(12)].map((_, i) => (
          <label key={i} className="table">
            Mesa {i + 1}
            <div className="sillas">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="silla"></div>
              ))}
            </div>
            <input type="checkbox" id={`mesa-${i + 1}`} className="checkbox" />
          </label>
        ))}
      </section>
      <section className="decoration">
        <div>Cocina</div>
        <div>Bar</div>
        <div>Area de juegos</div>
      </section>
      <button type="submit"><strong>Reservar</strong></button>
    </form>
  );
};

export default ReservationForm;
