import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className='about-us'>
      <div className='flags-container'>
        <figure>
          <img className='mexican-flag' src='https://img.icons8.com/color/48/mexico.png' alt='mexico-flag'/>
          <img className='colombian-flag' src='https://img.icons8.com/color/48/colombia.png' alt='colombia-flag'/>
        </figure>
      </div> 
      <h2 className='title'>Nuestra Cultura</h2>
      <p className='paragraph'>En Sabores Latinos, celebramos la riqueza cultural y gastronómica de México y Colombia. Nuestros platillos son una mezcla de tradición y sabor, utilizando ingredientes frescos y auténticos que evocan los aromas y colores de nuestras tierras.</p>
    </section>
  );
};

export default AboutUs ;
      