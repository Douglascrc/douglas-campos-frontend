import { album_api } from '@/services/apiService';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import cancelIcon from '@/assets/cancelIcon.svg';
import toast from 'react-hot-toast';
import { Album } from 'lucide-react';

interface Album {
    imageUrl: string;
    value: number;
    artistName: string;
    name: string;
    id: string;
}

const MyDisks = () => {
 const [albums, setAlbums] = useState<Album[]>([]);
 const [investment, setInvestment] = useState<number>(0);
 const [totalAlbums, setTotalAlbums] = useState<number>(0);
 const [isOpen, setIsOpen] = useState<boolean>(false);
 const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

 const fetchData = async () => {
   
  album_api.defaults.headers.common.Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`;
  try {
   const resp = await album_api.get('/my-collection');
   let albumsData = resp.data.content;
   console.log('Albums data:', albumsData);
   if(!Array.isArray(albumsData)) {
    albumsData = [albumsData];
   }
   setAlbums(albumsData);

   const qtdAlbums = albumsData.length;
   setTotalAlbums(qtdAlbums);

   const value = albumsData.reduce((acc: number, album: Album) => acc + album.value, 0);
   const valueFormatted = parseFloat(value.toFixed(2));
   setInvestment(valueFormatted);
  } catch (error) {  
   console.error('Error fetching data:', error);
  }
 };
 
 useEffect(() => {
  fetchData();
 }, []);

 const handleOpenPopup = (album: Album) => {
  setSelectedAlbum(album);
  setIsOpen(true); 
 };

 const handleClosePopup = () => setIsOpen(false);

 const handleRemove = useCallback(async () => {
  try {
   album_api.defaults.headers.common.Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`;
   const resp = await album_api.delete(`/remove/${selectedAlbum?.id}`);
   console.log(resp);
   toast.success('Disco removido com sucesso!');
   handleClosePopup();
   fetchData(); 
  } catch (error) {
   console.error('Error sending request:', error);
   toast.error('Erro ao remover o disco!');
  }
 }, [selectedAlbum]);



 return (
  <main className="h-full bg-[#19181F] ">
   <Navbar/>
   <div className="pt-44 pl-12">
    <h1 className=" font-bold text-white " style={{fontSize: '35px'}}>Meus Discos</h1>
   </div>

   <section className="pl-12 mt-8 flex invest ">
    <div className="w-60 p-3 rounded-lg flex bg-white" style={{border: '1px solid #000'}}>
     <img className="w-10 h-10 p-2 rounded-full bg-black" src="./src/assets/iconVideo.svg"/>
     <span className="ml-3 text-black font-bold">Total de Albuns   <br/> <h2 className="font-normal" style={{fontSize: '20px'}}>{totalAlbums}</h2></span>
    </div>

    <div className="w-60 p-3 rounded-lg h-full bg-white flex ml-5" style={{border: '1px solid #000'}}>
     <img className="w-10 h-10 rounded-full bg-black p-2" src="./src/assets/real.svg"/>
     <span className="ml-3 text-black font-bold">Valor Investido   <br/> <h2 className="font-normal" style={{fontSize: '20px'}}>R$ {investment}</h2></span>
    </div>
   </section >  

   <div className="mt-10 flex flex-wrap pl-10 pb-10 gap-4">
    {albums.length > 0 ? (
     albums.map((album, i) => (
      <div onClick={() => handleOpenPopup(album)} key={i} style={{ backgroundImage: `url(${album.imageUrl})` }} className="bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
      </div>
     ))
    ) : (
     <p className="text-white">Nenhum álbum encontrado.</p>
    )}

    {isOpen && selectedAlbum &&(
     <main className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
      <section className='flex bg-white w-[607px] h-[306px] justify-between items-stretch rounded-2xl relative'>
       <div className='flex h-full w-full'>
        <div className=' h-full flex rounded-l-xl overflow-hidden'>
         <img src={selectedAlbum.imageUrl} alt={selectedAlbum.name} className='object-cover' />
        </div>
        <div className='flex flex-col items-start p-4'>
         <h2 className='text-3xl font-bold'>{selectedAlbum.name}</h2>

         <div className='flex flex-col mt-6 gap-6'>
          <p className='text-lg text-gray-700 font-semibold '>Artista: {selectedAlbum.artistName}</p>                
          <p className='text-lg text-gray-700 font-semibold'>Preço: R${selectedAlbum.value}</p>
         </div>

         <div className='flex-grow'></div>
         <button onClick={() => handleRemove()} className='bg-[#a40d0d]  w-full text-white justify-center items-center rounded-2xl p-2 self-start'>
                Remover
         </button>
        </div>          
       </div>
            
       <button onClick={() => handleClosePopup()} className="absolute top-2 right-2"> <img src={cancelIcon} alt="Cancel Icon" /> </button>
      </section>
     </main>
    )}

   </div>                                         
  </main>
 );
};
export default MyDisks;