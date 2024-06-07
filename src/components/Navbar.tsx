import React, { useEffect } from 'react';
import Logo from '@/assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import avatar from '@/assets/avatar.png';
const Navbar = () => {

  const _navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    if(localStorage.getItem('@Auth.Token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

    return ( 
     <> 
      <header className="flex bg-white bg-opacity-30 items-center justify-between py-1 px-1 backdrop-blur-lg">
        <Link to='/dashboard' className='items-center justify-center flex cursor-pointer'>
          <img src={Logo} alt="Logo" className="w-12 h-12 ml-16"/>
          <h1 className='font-normal text-white'>BootPlay</h1>
        </Link>
        {isAuthenticated ? (
        <div className='flex mr-16 items-center'>
           <ul className='flex items-center '>
            <li>
              <Link to='/Mydisks' className='text-white font-medium text-base px-4 py-2'>Meus discos</Link>
            </li>
            <li>
              <Link to='/Mydisks' className='text-white font-medium text-base px-4 py-2'>Carteira</Link>
            </li>
            <li>   
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </li>
           </ul>
        </div>
          ) : (                  
            <ul className="flex items-center gap-4 mr-16">
             <li>
              <button onClick={() => _navigate('/login')}
               className="bg-black text-white px-4 py-2 rounded-2xl">
                Entrar
              </button>
             </li>
             <li>
              <button onClick={ () => _navigate('/signup')}
               className="bg-blue-300 text-black px-4 py-2 rounded-2xl"> 
                Inscrever-se  
              </button>
             </li>
            </ul>
      
        )}
      </header>
     </>
     );
}
 
export default Navbar;
