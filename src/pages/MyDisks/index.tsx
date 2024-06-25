import { album_api } from '@/services/apiService';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';


const MyDisks = () => {
 const [albums, setAlbums] = useState([]);
 const [investment, setInvestment] = useState(Number);
 const [totalAlbums, setTotalAlbums] = useState(Number);

 useEffect(() => {
  const fetchData = async () => {
   album_api.defaults.headers.common.Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`;
   const resp = await album_api.get('/my-collection');
   const albums = resp.data;
   setAlbums(albums);

   const qtdAlbums = albums.length;
   setTotalAlbums(qtdAlbums);

   const value = albums.reduce((acc: number, album: { value: number; }) => acc + album.value, 0);
   const valueFormated = value.toFixed(2).replace('.', ',');
   setInvestment(valueFormated);
   console.log(resp);
  };

  fetchData();
 }, []);

 return (
  <main className="h-full bg-[#19181F] ">
   <Navbar/>
   <div className="pt-44 pl-12">
    <h1 className=" font-bold text-white " style={{fontSize: '35px'}}>Meus Discos</h1>
   </div>

   <section className="pl-12 mt-8 flex invest ">
    <div className="w-60 p-3 rounded-lg flex bg-white" style={{border: '1px solid #000'}}>
     <img className="w-10 h-10 p-2 rounded-full bg-black" src="./src/assets/iconVideo.svg"/>
     <h1 className="ml-3 text-black font-bold">Total de Albuns   <br/> <h1 className="font-normal" style={{fontSize: '20px'}}>{totalAlbums}</h1></h1>
    </div>

    <div className="w-60 p-3 rounded-lg h-full bg-white flex ml-5" style={{border: '1px solid #000'}}>
     <img className="w-10 h-10 rounded-full bg-black p-2" src="./src/assets/real.svg"/>
     <h1 className="ml-3 text-black font-bold">Valor Investido   <br/> <h1 className="font-normal" style={{fontSize: '20px'}}>R$ {investment}</h1></h1>
    </div>
   </section >  

   <div className="mt-10 flex flex-wrap  pl-10 pb-10 gap-4">
    { albums?.map((album, i) => (
     <div key={i} style={{backgroundImage:`url(${album.imageUrl})`}} className="bg-cover  bg-no-repeat w-60 h-[245px]   rounded-md">
                                        
     </div>
    ))}
   </div>                                         
  </main>
 );
};
export default MyDisks;