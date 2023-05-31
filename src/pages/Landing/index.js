import AboutProject from '../../components/AboutProject';
import Intro from '../../components/Intro';
import Techs from '../../components/Techs';

const Landing = () => {
  const navData = [
    { title: 'О проекте', id: 'aboutProject' },
    { title: 'Технологии', id: 'technologies' },
    { title: 'Студент', id: 'student' },
  ];

  return (
    <>
      <Intro navData={navData} />
      <AboutProject {...navData[0]} />
      <Techs {...navData[1]}/>
    </>
  );
};

export default Landing;
