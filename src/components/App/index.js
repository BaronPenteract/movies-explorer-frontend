import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './index.css';

const App = () => {
  return (
    <div className='page'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
};

export default App;
