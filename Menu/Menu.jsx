import './Menu.css';

const Menu = () => {
  return (
    <section className='menu'>
      <h2>Nuestro Menú</h2>
      <div className='menu-items'>
        <div className='menu-item'>
          <h3>Tacos al Pastor</h3>
          <p>Deliciosos tacos de cerdo marinados con piña y especias, una tradición de la cocina mexicana.</p>
        </div>
        <div className='menu-item'>
          <h3>Bandeja Paisa</h3>
          <p>Un plato típico colombiano con frijoles, arroz, carne molida, chorizo, chicharrón, huevo frito y aguacate.</p>
        </div>
      </div>
    </section>
  );
};

export { Menu };


