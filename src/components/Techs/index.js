import './index.css';

const Techs = ({ id, title }) => {
  const techsData = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

  return (
    <div id={id} className='container container_type_techs techs'>
      <h2 className='container__title techs__title'>{title}</h2>
      <div className='techs__text'>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__about'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className='techs__list'>
        {techsData.map((tech, idx) => (
          <li key={idx} className='techs__item'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Techs;
