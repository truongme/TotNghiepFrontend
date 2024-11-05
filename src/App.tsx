import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { router } from './routers';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      {/* <div className='header-fixed'>
        <Header/>
      </div>
      <div style={{marginTop:'60px'}}>
        <Routes>
          {router.map((router, index) => (
            <Route key={index} path={router.path} element={router.element}/>
          ))}
        </Routes>
        <Footer/>
      </div> */}
      <Admin/>
    </div>
  );
}

export default App;
