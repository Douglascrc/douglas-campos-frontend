import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
   
   const _navigate = useNavigate()

      return ( 
       <>
         <div className="bg-no-repeat bg-cover bg-fundo bg-center h-full">
          <Navbar />
          <section className="flex flex-wrap h-screen gap-4 backdrop-brightness-50">
            <main className='flex flex-col max-w-[800px] pl-[100px] items-start gap-8'>
               <div className='gap-6 my-16'>
                  <h1 className='text-white font-semibold text-[64px]'>A história da música não pode ser esquecida!</h1>
                  <h3 className='text-white text-2xl max-w-[633px]'>Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</h3>
               </div> 
               <Button onClick={() => _navigate('/signup')} className="text-black bg-blue-300 font-semibold text-2xl rounded-[32px] h-16 w-[269px]">Inscrever-se</Button>
            </main> 
          </section>
         </div>
       </>
       );
}
 
export default Home;