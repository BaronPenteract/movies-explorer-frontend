import { Link as ScrollLink } from 'react-scroll';

import './index.css';

const Intro = ({ navData }) => {
  const navElements = navData.map((item, idx) => (
    <li key={idx} className='nav__item'>
      <ScrollLink className='link nav__link' to={item.id} smooth={true} duration={500}>
        {item.title}
      </ScrollLink>
    </li>
  ));

  return (
    <section className='container container_type_intro intro'>
      <div className='intro__container'>
        <div className='intro__content'>
          <h1 className='intro__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <nav className='nav'>
            <ul className='nav__list'>{navElements}</ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Intro;
