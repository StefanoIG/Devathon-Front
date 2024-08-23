import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-links'>
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href='/'>Inicio</a></li>
            <li><a href='/about'>Sobre Nosotros</a></li>
            <li><a href='/services'>Servicios</a></li>
            <li><a href='/contact'>Contacto</a></li>
          </ul>
        </div>
        <div className='footer-contact'>
          <h4>Contacto</h4>
          <p>Teléfono: +1 (234) 567-890</p>
          <p>Email: <a href='mailto:info@mexacol.com'>info@mexacol.com</a></p>
        </div>
        <div className='footer-social'>
          <h4>Síguenos</h4>
          <div className='social-icons'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebook />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram />
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2024 MexaCol. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
