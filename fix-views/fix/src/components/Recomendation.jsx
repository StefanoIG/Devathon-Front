import './Recomendation.css';

const Recomendation = () => {
  return (
    <section className='menu'>
      <h2 className='menu-title'> Recomendaciones del dia de hoy</h2>
      <div className='menu-items'>
        <div className='menu-item'>
          <h3 className='card-title'>Tacos al Pastor</h3>
          <p>Deliciosos tacos de cerdo marinados con piña y especias, una tradición de la cocina mexicana.</p>
        </div>
        <div className='menu-item'>
          <h3 className='card-title'>Bandeja Paisa</h3>
          <p>Un plato típico colombiano con frijoles, arroz, carne molida, chorizo, chicharrón, huevo frito y aguacate.</p>
        </div>
      </div>
    </section>
  );
};

export default  Recomendation ;


