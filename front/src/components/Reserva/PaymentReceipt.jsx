import React from 'react';

const PaymentReceipt = () => {
;

  return (
    <section className="payment-receipt">
      <h2>Comprobante de Pago</h2>
      <p><strong>Usuario:</strong> {user.username}</p>
      <p><strong>Fecha de Reserva:</strong> {reservation['reservation-date']}</p>
      <p><strong>Número de Personas:</strong> {reservation['num-persons']}</p>
      <p><strong>Platillo:</strong> {reservation['dish']}</p>
      <p><strong>Cantidad:</strong> {reservation['quantity']}</p>
      
    </section>
  );
};

export default PaymentReceipt;
