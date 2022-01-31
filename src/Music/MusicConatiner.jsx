import React, { useCallback, useState } from 'react';
import SongList from './SongList.jsx/SongList';
import Player from './Player/Player';
import SongDetail from './SongDetails/SongDetails';
import axios from 'axios';
import  { getApiDomain } from '../App';
import useAsync from '../Hooks/useAsync';

export default function MusicContainer() {
    const asyncCallback = useCallback(() => {
        return axios.get(`${getApiDomain()}/songs`) }, []);
    const {data, error} = useAsync(asyncCallback);
    const songs = data||[];
    const [selectedSong, setSelectedSong] = useState(0);
   

    return (
        <>
        <SongDetail selectedSongId={selectedSong} songs={songs}/>
       <SongList  selectedSong={selectedSong} songs={songs} selectedSongId = {id => setSelectedSong(id)}/>
        {songs.length > 0  && <Player songs={songs} selectedSongId={selectedSong} selectSongById={id => setSelectedSong(id)}/>}
        
        </>
    );
}