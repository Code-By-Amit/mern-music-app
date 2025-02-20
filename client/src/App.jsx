import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { Home } from './Pages/Home'
import { Playlist } from './Pages/Playlist'
import { Favourates } from './Pages/Favourites'
import { RightLayout } from './components/Layout/RightLayout'
import { Explore } from './Pages/Explore'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'
import { UploadSongPage } from './Pages/UploadSongPage'
import { RecentPlaysPage } from './Pages/RecentPlaysPage'
import { AllSongs } from './Pages/AllSongs'
import { AllPlaylist } from './Pages/AllPlaylist'
import { AllArtist } from './Pages/AllArtist'
import { PlayBar } from './components/UI/PlayBar'
import { PlaylistPage } from './Pages/PlaylistPage'
import { ArtistPage } from './Pages/ArtistPage'
import { CreateEditPlaylist } from './components/CreateEditPlaylist'
import { UploadEditSong } from './components/uploadEditSong'
import { EditUserProfile } from './components/EditUserProfile'
import { CreateArtistForm } from './components/CreateArtistForm'
import { RequestForm } from './components/RequestForm'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<MainLayout />}>
          <Route element={<RightLayout />} >
            <Route index element={<Home />} />
            <Route path='/playlist' element={<Playlist />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/favourites' element={<Favourates />} />
            <Route path='/recent' element={<RecentPlaysPage />} />
            <Route path='/uploads' element={<UploadSongPage />} />
            <Route path='/all-songs' element={<AllSongs />} />
            <Route path='/all-playlist' element={<AllPlaylist />} />
            <Route path='/all-artist' element={<AllArtist />} />
            <Route path='/playlist-page/:id' element={<PlaylistPage />} />
            <Route path='/artist-page/:id' element={<ArtistPage />} />
            <Route path='/create-playlist' element={<CreateEditPlaylist />} />
            <Route path='/upload-song' element={<UploadEditSong />} />
            <Route path='/edit-profile' element={<EditUserProfile />} />
            <Route path='/create-artist' element={<CreateArtistForm />} />
            <Route path='/request-form' element={<RequestForm />} />
          </Route>
        </Route>
      </Routes>
      <PlayBar />
    </>
  )
}

export default App
