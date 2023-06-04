import './index.css';

const Preloader = () => {
  return (
    <div className='preloader'>
      <div className='preloader__content'>
        <span className='preloader__dot preloader-anim' />
        <span className='preloader__dot preloader-anim' />
        <span className='preloader__dot preloader-anim' />
        <span className='preloader__dot preloader-anim' />
      </div>
    </div>
  );
};

export default Preloader;
