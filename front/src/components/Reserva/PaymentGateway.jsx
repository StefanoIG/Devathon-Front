import React from 'react';

const PaymentGateway = () => {
  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('payment', JSON.stringify(data));
    alert('Pago registrado exitosamente.');
  };

  return (
    <form className="payment-gateway" onSubmit={handlePaymentSubmit}>
      <h2>Pasarela de Pagos</h2>
      <label htmlFor="card-holder">Titular de la Tarjeta:</label>
      <input type="text" id="card-holder" name="card-holder" required />
      
      <label htmlFor="card-number">Número de Tarjeta:</label>
      <input type="text" id="card-number" name="card-number" required pattern="\d{16}" placeholder="1234 5678 9101 1121" />
      
      <label htmlFor="expiry-date">Fecha de Expiración:</label>
      <input type="text" id="expiry-date" name="expiry-date" required placeholder="MM/YY" />
      
      <label htmlFor="cvv">CVV:</label>
      <input type="text" id="cvv" name="cvv" required pattern="\d{3}" placeholder="123" />
      
      <button type="submit" className="button">Realizar Pago</button>
    </form>
  );
};

export default PaymentGateway;
