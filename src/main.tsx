import ReactDOM from 'react-dom/client'
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page01 } from './pages/Navegation/Page01';
import { Page02 } from './pages/Navegation/Page02';
import { ErrorPage } from './pages/Navegation/Error';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Signup } from './pages/Signup';
import  Home  from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER */}
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' index element={<Home />} />
          <Route path='/login' index element={<Login />} />
          <Route path='/signup' index element={<Signup />} />
          <Route path='' element={<PrivateRoutes />}>
            <Route path='/page01' element={<Page01 />} />
          </Route>
          <Route path='/page02' element={<Page02 />} />
        </Routes>
      </BrowserRouter>
      {/* REACT ROUTER */}
    </AuthProvider>
  </React.Fragment>
)
