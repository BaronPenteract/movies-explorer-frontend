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
            <p className='student__info'>React-разработчик, 29 лет</p>
            <p className='student__text'>
              Я&nbsp;родился в&nbsp;р.п. <nobr>Верх-Чебула</nobr>. Учился в&nbsp;Кемеровском Гос.
              Университете. Окончил бакалавриат и&nbsp;магистратуру по&nbsp;направлению
              &laquo;Физика&raquo;, и&nbsp;то, и&nbsp;то&nbsp;с&nbsp;отличием. Работал в&nbsp;разных
              сферах и&nbsp;разных городах от&nbsp;Кемерово до&nbsp;Новороссийска.
            </p>
            <p className='student__text'>
              Недавно начал кодить, понравилось (почему раньше этим не&nbsp;занялся?).
            </p>
            <p className='student__text'>
              Пошел на&nbsp;курсы от&nbsp;Яндекса на&nbsp;<nobr>web-разработчика</nobr>. Было
              довольно таки легко, за&nbsp;исключением 4-х&nbsp;&mdash; 5-ти моментов. Вношу
              финальные правки в&nbsp;дипломную работу) После зачета по&nbsp;нему, поставлю
              на&nbsp;свой комп <nobr>какой-нибудь</nobr> из&nbsp;&laquo;линуксов&raquo;, давно
              об&nbsp;этом думаю.
            </p>
            <p className='student__text'>Сейчас обосновался в&nbsp;Новосибирске.</p>
            <p className='student__text'>
              Решил <nobr>все-таки</nobr> написать пару слов о&nbsp;себе.
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
