import './InvoicesSection.css';

const InvoicesSection = () => {
  return (
    <section className='invoices-section'>
      <div className='invoices-left'>
        <h2>Mis facturas</h2>
        
      </div>
      <div className='invoices-center'>
        <h2>Filtrar por fecha</h2>
        <input type='date' className='date-input' />
      </div>
    </section>
  );
};

export { InvoicesSection };


