import './index.css';

const AboutProject = ({ title, id }) => {
  const aboutData = [
    {
      title: 'Дипломный проект включал 5 этапов',
      description:
        'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    },
    {
      title: 'На выполнение диплома ушло 5 недель',
      description:
        'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    },
  ];

  const aboutElements = aboutData.map((item, idx) => (
    <li key={idx} className='about__content-item'>
      <h3 className='about__content-title'>{item.title}</h3>
      <p className='about__content-description'>{item.description}</p>
    </li>
  ));

  return (
    <section id={id} className='section about'>
      <h2 className='section__title about__title'>{title}</h2>
      <ul className='about__content'>{aboutElements}</ul>
      <div className='roadmap'>
        <div className='roadmap__content'>
          <p className='roadmap__uptitle roadmap__uptitle_active'>1 неделя</p>
          <h4 className='roadmap__title'>Back-end</h4>
        </div>
        <div className='roadmap__content'>
          <p className='roadmap__uptitle'>4 недели</p>
          <h4 className='roadmap__title'>Front-end</h4>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
