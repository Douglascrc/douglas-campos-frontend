import React, { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import { user_api } from '../../services/apiService'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Logo from '@/assets/logo.svg';
import { Link } from 'react-router-dom';

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSigup(event : FormEvent) {
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    event.preventDefault();

    const data = {
      name,
      email,
      tel,
      password
    };

    console.log(data);

    await user_api.post("/create", data)
    .then(resp => {
      console.log(resp.data);
      toast.dismiss(toastId);
      toast.success("Conta criada com sucesso!");
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log(err);
    });
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-fundo  bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative flex flex-col bg-white rounded-3xl h-fit w-full max-w-[420px] max-h-[623px] items-center p-8 shadow-md">
        
        <img src={Logo} alt="Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold">Criar Conta</h1>
        <form onSubmit={handleSigup} className="flex flex-col w-full mt-8 gap-2">
          <Input type='text' required onChange={event => setName(event.target.value)}>Nome</Input>
          <Input type='email' required onChange={event => setEmail(event.target.value)}>Email</Input>
          <Input type='tel' onChange={event => setTel(event.target.value)}>Telefone</Input>
          <Input type='password' required onChange={event => setPassword(event.target.value)}>Senha</Input>

          { loading ? 
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </Button>
            :
            <Button type='submit' disabled={false} className="bg-zinc-900 text-white rounded-2xl">
              Criar Conta
            </Button>
          }
        </form>
        <div className="flex items-center justify-center mt-4">
          <p className="font-light">Já tem uma conta?{<Link className="font-bold underline" to='/Login' > Entrar</Link>}</p>
          
        </div>
      </div>
    </main>
  )
}
