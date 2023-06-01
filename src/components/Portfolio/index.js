import RightUpArrowSVG from '../svg/RightUpArrowSVG';
import './index.css';

const Portfolio = () => {
  const portfolioData = [
    { title: 'Статичный сайт', link: 'https://github.com/BaronPenteract/how-to-learn' },
    {
      title: 'Адаптивный сайт',
      link: 'https://baronpenteract.github.io/russian-travel/index.html',
    },
    { title: 'Одностраничное приложение', link: 'https://baron.nomoredomains.monster' },
  ];
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        {portfolioData.map((item, idx) => (
          <li key={idx} className='portfolio__item'>
            <a className='link portfolio__link' href={item.link} target='_blank' rel='noreferrer'>
              <span>{item.title}</span>
              <RightUpArrowSVG className='portfolio__svg' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
