import { Link } from 'react-router-dom';

import LogoSVG from '../svg/LogoSVG';
import './index.css';

const AuthForm = ({ title, name, onSubmit, children }) => {
  return (
    <form className={`form-auth`} name={name} onSubmit={onSubmit} action='/' noValidate>
      <div className='form-auth__header'>
        <Link to='/' className='form-auth__link'>
          <LogoSVG className='form-auth__logo' />
        </Link>
        <h1 className='form-auth__title'>{title}</h1>
      </div>
      {children}
    </form>
  );
};

export default AuthForm;
