import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';
import { FiSearch } from 'react-icons/fi';
import Navbar from '@/components/Navbar';

const Dashboard = () =>  {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [search, setSearch] = useState<string>('');

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

  function handleLink(url?: string) {
    window.open(url, '_blank');
  }

  return (
    
    <div className="flex flex-col min-h-screen bg-[#19181F]">
      
      <nav>
        
      </nav>

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
      <Card className="flex flex-wrap justify-center h-full gap-4 border-none m-2">
       
        { albums?.map((album, i) => (
          <div key={i} style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
            <div onClick={() => handleLink(album.externalUrls.externalUrls.spotify)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
              <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
            </div>
          </div>
        ))}
      </Card>
    </div>
    
  )
}

export default Dashboard;