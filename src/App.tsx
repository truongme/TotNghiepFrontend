import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { router } from './routers';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <div className='header-fixed'>
        <Header/>
      </div>
      <Routes>
        {router.map((router, index) => (
          <Route key={index} path={router.path} element={router.element}/>
        ))}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
