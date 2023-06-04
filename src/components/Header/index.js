import './index.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab';
import AuthTab from '../AuthTab';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  return (
    <header className='container header'>
      <Link to='/' className='header__link'>
        <img className='header__logo' src={logo} alt='Логотип Movies Explorer' />
      </Link>
      {loggedIn ? <NavTab /> : <AuthTab />}
    </header>
  );
};

export default Header;
