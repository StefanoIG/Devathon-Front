import ReservationForm from '../components/ReservationForm';
import TokenAlert from '../components/TokenAlert';
const Reservation = () => (
  <>
  <TokenAlert />
  <div className='vista-reservation'>
    <h1>
      Reservar Mesa
    </h1>
    <h3>En caso de grandes reservas (2 o mas mesas) por favor brindanos tu informacion de contacto a continuacion </h3>
    <h4>Para brindarte una atencion personalizada</h4>
    <button className='cta-button'>Contactar</button>

  </div>  
    <ReservationForm />
  </>
);

export default Reservation;
