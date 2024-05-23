import React from 'react';
import Logo from '@/assets/logo.svg';


const Navbar = () => {
    return ( 
     <>
        <header className="flex bg-gray-400 items-center justify-between py-1 px-1 backdrop-blur-lg">
            <img src={Logo} alt="Logo" className="w-12 h-12 ml-16"/>
            <ul className="flex items-center gap-4 mr-16">
             <li>
              <button className="bg-black text-white px-4 py-2 rounded-2xl">
                <a href="/login">Entrar</a> 
              </button>
             </li>
             <li>
              <button className="bg-blue-300 text-black px-4 py-2 rounded-2xl"> 
                <a href="/signup">Inscrever-se</a>  
              </button>
             </li>
            </ul>
        </header>
     </>
     );
}
 
export default Navbar;
