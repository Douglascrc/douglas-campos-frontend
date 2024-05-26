import ReactDOM from 'react-dom/client'
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/Error/404';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Signup } from './pages/Signup';
import MyDisks from './pages/MyDisks';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER */}
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/dashboard' index element={<Dashboard />} />
          <Route path='/login' index element={<Login />} />
          <Route path='/signup' index element={<Signup />} />
          <Route path='/' index element={<Home />} />

          <Route path='' element={<PrivateRoutes />}>
            <Route path='/MyDisks' element={<MyDisks />} />
          </Route>

        </Routes>
      </BrowserRouter>
      {/* REACT ROUTER */}
    </AuthProvider>
  </React.Fragment>
)
