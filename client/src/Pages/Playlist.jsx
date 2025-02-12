import React, { useEffect, useState } from 'react'
import { PlaylistCard } from '../components/UI/PlaylistCard'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { fetchUserCreatedSavedPlaylist } from '../apis/playlistApi'
import { useQuery } from '@tanstack/react-query'

export const Playlist = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  // Fetch Playlists
  const { data, isLoading: loadingPlaylists, isError: errorPlaylists } = useQuery({
    queryKey: ["user-Created/Saved-Playlist"],
    queryFn: () => fetchUserCreatedSavedPlaylist(token),
    enabled: !!token
  });

  if (loadingPlaylists) return <div>Loading .....</div>
  if (errorPlaylists) return <div>Error .....</div>

  const userSavedPlaylist = data?.userSavedPlaylist || [];
  const userCreatedPlaylist = data?.userCreatedPlaylist || [];


  return (
    <>
      < div className="Playlist my-4 flex flex-col gap-5" >

        {/* Saved Playlists  */}
        <div>
          <div className='flex justify-between px-3 items-center'>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Saved Playlist</h1>
          </div>

          <div className='playlist flex flex-nowrap  gap-4 items-center justify-start p-4'>
            {
              userSavedPlaylist.map((playlist) => {
                return <PlaylistCard key={playlist._id} id={playlist._id} songsLength={playlist.songs.length} imgSrc={playlist.image} title={playlist.name} />
              })
            }
          </div>
        </div>


        {/* Your Playlists  */}
        <div>
          <div className='flex justify-between px-3 items-center'>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Your Playlist</h1>
          </div>

          <div className='playlist flex flex-wrap  gap-4 items-center justify-start p-4'>
            {
              userCreatedPlaylist.map((playlist) => {
                return <PlaylistCard key={playlist._id} id={playlist._id} songsLength={playlist.songs.length} imgSrc={playlist.image} title={playlist.name} />
              })
            }
          </div>
        </div>

        <div className=' mx-7 mb-19'>
          <button className='text-white rounded shadow-md py-2.5 px-3 text-base md:text-md font-semibold bg-[var(--primary-color)] flex items-center gap-3 hover:opacity-75 active:opacity-75'>
            <MdOutlineCreateNewFolder className='text-2xl md:text-3xl' />
            Create a Playlist
          </button>
        </div>
      </div >
    </>
  )
}
