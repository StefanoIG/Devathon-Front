import './Hero.css';

const Hero = () => {
  return (
    <header className='hero'>
      <div className='hero-content'>
        <h1>MexaCol</h1>
        <p>Donde la riqueza de México y Colombia se encuentran en tu plato.</p>
        <a href='/reservation' className='cta-button'>Reserva tu Mesa</a>
      </div>
    </header>
  );
};

export default  Hero ;