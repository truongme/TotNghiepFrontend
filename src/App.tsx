import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { adminRoutes, userRoutes } from './routers';
import Header from './components/Header';
import Footer from './components/Footer';
import { ROLE } from './constants';

function App() {

  const [roleUser, setRoleUser] = useState<any>()
  const [router, setRouter] = useState<any>()

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setRoleUser(role)
    role === ROLE.ADMIN ? setRouter(adminRoutes) : setRouter(userRoutes)
  },[roleUser])

  return (
    <div>
      {roleUser === ROLE.CUSTOMER || !roleUser  && (
        <div className='header-fixed'>
          <Header/>
        </div>
      )}
      <div style={{marginTop:'60px'}}>
        <Routes>
          {router?.map((router: any, index: number) => (
            <Route key={index} path={router.path} element={router.element}/>
          ))}
        </Routes>
      </div>
      {roleUser === ROLE.CUSTOMER || !roleUser && (
        <Footer/>
      )}
    </div>
  );
}

export default App;
