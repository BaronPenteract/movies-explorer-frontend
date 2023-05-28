import AboutProject from '../../components/AboutProject';
import Intro from '../../components/Intro';

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
    </>
  );
};

export default Landing;
