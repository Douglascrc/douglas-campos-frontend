import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import React, { useEffect, useState } from 'react'

export function Landing() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);

  useEffect(() => {
    album_api.defaults.headers.common.Authorization = "Basic YWx2ZXNyZW5hbnNhbnRvc0Bob3RtYWlsLmNvbTokMmEkMTAkZU5vblNhaDZHMGEvNnA2T2ZOVk1nZWUxRVlOY2RWOUZHQm5OaHp0azJhYU9odlg3OS80Slc"
    album_api.get('/albums/all?searchText=Rock')
    .then((resp) => {
      setAlbums(resp.data);
      console.log(albums);
    })
  }, []);


  function handleLink(url?: string) {
    window.open(url, '_blank');
  }

  return (
    <main className="flex flex-col items-center justify-center h-full mt-10 gap-4">
      <h1 className="text-2xl font-semibold">Albums</h1>
      <input type="text" />
      <button>Buscar</button>

      <section className="flex flex-wrap justify-center h-full gap-4 m-2">
        {/* Card */}
        { albums?.map((album, i) => (
          <div key={i} style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
            <div onClick={() => handleLink(album.externalUrls.externalUrls.spotify)} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
              <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
            </div>
          </div>
        ))}

        {/* { albums?.map((album, i) => (
          <div className="w-60 h-[245px] rounded-md">
            <div className="absolute w-60 h-[245px] backdrop-brightness-50">
              <div className="flex items-center justify-center w-full h-full p-6">
                <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
              </div>
            </div>
            <img src={album.images[0].url} alt={album.name} className="w-full h-60 object-cover" />
          </div>
        )) } */}
        {/* Card */}
      </section>
    </main>
  )
}

