import { Link } from 'react-router-dom';

import './index.css';

const Footer = () => {
  return (
    <div className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__content'>
        <div className='footer__copyright'>© 2020</div>
        <div className='footer__links'>
          <Link className='link footer__link'>Яндекс.Практикум</Link>
          <Link className='link footer__link'>Github</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
