import './index.css';

import studentPhoto from '../../images/student-photo.png';
import Portfolio from '../Portfolio';

const Student = ({ id, title }) => {
  return (
    <section id={id} className='container container_type_student student'>
      <h2 className='container__title student__title'>{title}</h2>
      <div className='student__container'>
        <div className='student__content'>
          <div className='student__about'>
            <h3 className='student__name'>Андрей</h3>
            <p className='student__info'>Фронтенд-разработчик, 30 лет</p>
            <p className='student__text'>
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
              У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в&nbsp;компании &laquo;СКБ
              Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься
              фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
          </div>
          <a
            className='link student__link'
            target='_blank'
            href='https://github.com/BaronPenteract'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='student__photo' alt='Фотография студента' src={studentPhoto} />
      </div>
      <Portfolio />
    </section>
  );
};

export default Student;
