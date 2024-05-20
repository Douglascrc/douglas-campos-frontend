import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

const Albums = [
  { name: 'Album01', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album02', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album03', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album04', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album05', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album06', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album07', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album08', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album09', image: 'https://picsum.photos/200', url: '' },
  { name: 'Album10', image: 'https://picsum.photos/200', url: '' }
]


const Home = () => {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const _navegate = useNavigate();

  useEffect(() => {  
    album_api.get('/albums/all?searchText=Rock', {headers: { Authorization: `Basic ${localStorage.getItem('@Auth.Token')}`}})
    .then((resp) => {
      setAlbums(resp.data);
      console.log(albums);
    })
  }, []);

  return (
    <section className="flex flex-wrap justify-center h-full gap-4 m-2">
      {/* Card */}
      { Albums?.map((album, i) => (
        <div key={i} style={{'--bg-fundo': `url(${album.image})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
          <div onClick={() => _navegate(album.url)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
            <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center h-screen relative overflow-hidden">
       <div className="carousel-home absolute left-0 flex items-center w-full">
         {Albums.map((album, i) =>(
          <div className="pr-8">
            <div key={i} style={{'--bg-fundo': `url(${album.image})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
              <div onClick={() => _navegate(album.url)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
    
  )
}
export default Home;