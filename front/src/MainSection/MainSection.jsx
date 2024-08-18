import './MainSection.css';

const MainSection = () => {
  return(
    <main className='main-container'>
      <div className='cards-container'>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
        <div className='card'>
          <input type='date' className='date-input' />
          <button className='download-button'>Descargar</button>
        </div>
      </div>
    </main>
  )
};

export { MainSection };
