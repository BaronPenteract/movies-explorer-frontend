import './index.css';

const Footer = () => {
  return (
    <footer className='container container_type_footer footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__content'>
        <div className='footer__copyright'>© 2023</div>
        <div className='footer__links'>
          <a
            className='link footer__link'
            href='https://practicum.yandex.ru/'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='link footer__link'
            href='https://github.com/BaronPenteract'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
