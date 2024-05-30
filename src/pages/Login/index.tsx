import React, { FormEvent, useState } from 'react'
import logo from '../../assets/logo.svg';
import  Input from '@/components/Input';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const _navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    login(email, password)
    .then(() => { 
      toast.success("Login efetuado com sucesso!");
      
      setTimeout(() => {
        _navigate('/Error/404');
      }, 2000);

    }).catch(() => {
      toast.error("Erro ao efetuar login!");
    });
  }

  return (
    <>
      {isAuthenticated && <Navigate to='Error/404' />}
      <div className="bg-fundo bg-cover bg-no-repeat h-screen">
        <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
          {/* Container */}
          <div className="flex justify-center max-w-[544px] w-1/2 h-2/3 py-14 bg-white rounded-3xl">
            <div className="flex flex-col items-center">
              <img src={logo} className="h-14" />
              <h1 className="text-xl font-semibold">Acesse sua conta</h1>
              {/* From */}
              <form onSubmit={handleLogin} className="flex flex-col lg:w-96 w-full gap-8">
                <Input onChange={e => setEmail(e.target.value)} type='email'>Email:</Input>
                <Input onChange={e => setPassword(e.target.value)} type='password'>Senha:</Input>
                <button type='submit' className="p-3 bg-zinc-900 text-white hover:bg-zinc-900/90 font-bold text-lg rounded-3xl transition mb-3">Entrar</button>
              </form>
              <p className="text-base font-light">Ainda não tem conta ? <a href="/signup" className="font-semibold underline">Inscrever-se</a></p>
              {/* From */}
            </div>
          </div>
          {/* Container */}
        </div>
      </div>
    </>
  )
}
