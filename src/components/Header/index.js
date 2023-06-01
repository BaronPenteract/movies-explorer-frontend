import './index.css';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab';
import AuthTab from '../AuthTab';

const Header = ({ isLoggedIn }) => {
  return (
    <header className='container header'>
      <img className='header__logo' src={logo} alt='Логотип Movies Explorer' />
      {isLoggedIn ? <NavTab /> : <AuthTab />}
    </header>
  );
};

export default Header;
