import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, userRoutes } from './routers';
import Header from './components/Header';
import Footer from './components/Footer';
import { ROLE } from './constants';
import NavAdmin from './components/NavAdmin';

function App() {

  const [roleUser, setRoleUser] = useState<any>()
  const [router, setRouter] = useState<any>()

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setRoleUser(role)
    role === ROLE.ADMIN ? setRouter(adminRoutes) : setRouter(userRoutes)
  },[roleUser])

  return (
    <div className={`${roleUser === ROLE.ADMIN ? 'admin-container' : ''} `}>
      {roleUser !== ROLE.ADMIN  ? (
        <div className='header-fixed'>
          <Header/>
        </div>
      ) : (
        <div className='nav-fixed'>
          <NavAdmin/>
        </div>
      )}
      <div className={`${roleUser === ROLE.ADMIN ? 'admin-router' : 'admin-customer'} `}>
        <Routes>
          {router?.map((router: any, index: number) => (
            <Route key={index} path={router.path} element={router.element}/>
          ))}
        </Routes>
      </div>
      {roleUser !== ROLE.ADMIN && (
        <Footer/>
      )}
    </div>
  );
}

export default App;
