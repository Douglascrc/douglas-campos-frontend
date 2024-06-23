import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import cancelIcon from '@/assets/cancelIcon.svg'
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Dashboard = () =>  {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);

  const handlePurchase =  () => {
    if (!selectedAlbum) {
      toast.error("Álbum não selecionado!");
      return;
    }
    const data = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
    
    const requestBody = {
      
      name: selectedAlbum.name,
      artistName: selectedAlbum.artists[0].name, 
      idSpotify: selectedAlbum.id, 
      imageUrl: selectedAlbum.images[0]?.url, 
      value: selectedAlbum.value,
      users: {
        id: data['id'],
        email: data['email'],
        password: data['password']
      }
    };

    album_api.post('/sale', requestBody).then((resp) => {
      console.log(resp);
      toast.success("Compra efetuada com sucesso!");
      handleClosePopup();
    }).catch(error => {
      if(error === 400 || error === 500) {
        toast.error("Erro ao efetuar a compra!");
      }
      toast.error("Você já comprou esse álbum!");
    });

    console.log(requestBody);
    return requestBody
  };

  const handleOpenPopup = (album: AlbumModel) => {
    setSelectedAlbum(album)
    setIsOpen(true) 
  } 

  const handleClosePopup = () => setIsOpen(false)

  const fetchAlbums = () => {

    album_api.defaults.headers.common.Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`;

    if(search === '') {
     return null 
    }
    album_api.get(`/all?searchText=${search}`)
    .then((resp) => {
      setAlbums(resp.data);
      console.log(albums);
    })
  };

  useEffect(() => {
    fetchAlbums();
  },[])

  

  return (
    
    <div className="flex flex-col min-h-screen bg-[#19181F]">

      <div className='flex h-[70vh] relative bg-profile bg-size-person bg-pos-custom bg-no-repeat' >
        <div className="w-full h-full absolute bg-gradient-to-t from-[#19181F] to-10%"></div>

        <main className='flex flex-col w-full h-full bg-opacity-50 bg-neutral-950 '>
          <Navbar/>
          <section className='flex flex-col lg:w-[35%] w-[80%] justify-center mt-56 drop-shadow-[-1px_1px_0_rgb(0,0,0)] p-4 gap-8'>
            <h1 className='text-white font-semibold text-4xl'> A história da música não pode ser esquecida!</h1>
            <span className='text-white font-normal text-xl' > Sucessos que marcaram o tempo!!!</span>  
          </section>    
        </main>
      </div>
      
      
      <div className='flex flex-row w-fit items-center justify-center gap-2 mx-auto my-2'>
        <input  name="search"
                  type="text"
                  className="bg-[#19181F] ring-1 ring-white text-white hover:ring-2 focus:ring-2 w-full focus:outline-none rounded-md p-2 pr-14"
                  placeholder="Procure algo..." onChange={(e) => setSearch(e.target.value)} />
                  <button type='submit' className='absolute translate-x-28' onClick={fetchAlbums}>
                    <FiSearch className='w-6 h-6'/>
                  </button>
      </div>

      <div className='justify-start ml-4'>
        <h1 className="text-2xl font-semibold text-white">Trends</h1>
      </div>
      <div className="carousel-disks flex gap-2 overflow-x-auto w-full absolute m-4 border-none">
       
        { albums?.map((album, i) => (
          <div key={i} style={{'--bg-fundo': `url(${album.images[0].url})`, minWidth: '240px'} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
            <div onClick={() => handleOpenPopup(album)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
              <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
            </div>
          </div>
        ))}
        
      </div>
      {isOpen && selectedAlbum &&(
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
          <div className='flex bg-white w-[607px] h-[306px] justify-between items-stretch rounded-2xl'>
            <div className='flex h-full w-full'>
              <div className=' h-full flex rounded-l-xl overflow-hidden'>
                <img src={selectedAlbum.images[0].url} alt={selectedAlbum.name} className='object-cover' />
              </div>
              <div className='flex flex-col items-start p-4'>
                <h2 className='text-2xl font-bold'>{selectedAlbum.name}</h2>

                <div className='flex flex-col mt-6 gap-6'>
                  <p className='text-base text-gray-700 font-semibold '>Artista: {selectedAlbum.artists[0].name}</p>                
                  <p className='text-base text-gray-700 font-semibold'>Data de Lançamento: {format(new Date (selectedAlbum.releaseDate),'dd/MM/yyyy')}</p>
                  <p className='text-base text-gray-700 font-semibold'>Preço: R${selectedAlbum.value}</p>
                </div>

                <div className='flex-grow'></div>
                <button onClick={() => handlePurchase()} className='bg-[#FBBC05] w-full text-white justify-center items-center rounded-2xl p-2 self-start'>
                Comprar
                </button>
              </div>          
            </div>
            
            <button onClick={() => handleClosePopup()} className="relative -top-32 right-4"> <img src={cancelIcon} alt="Cancel Icon" /> </button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default Dashboard;