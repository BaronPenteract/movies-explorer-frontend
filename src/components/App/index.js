import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import './index.css';

const App = () => {
  return (
    <div className='page'>
      <div className='container'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default App;
