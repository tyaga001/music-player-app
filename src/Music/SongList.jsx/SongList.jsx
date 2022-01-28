import React from 'react';
import './SongList.css';
import logo from '../../playing.gif';
export default function SongList({songs, selectedSongId, selectedSong}) {

    return (
        <>
            <div className='header'>
                <div className='tarck-number'>#</div>
                <div className='track-title'>Title</div>
                <div className='track-author'>Author</div>
            </div>
            
                   <div className='song-main' > {songs.map((item, index) => 
               
                        <div className={`song-list ${index === selectedSong ? 'active' : ''}`}  onClick={() => selectedSongId(index)}>
                         {index !== selectedSong ? <div className='tarck-number'>{index+1}</div> : <div className="index">
                    <img
                        alt=""
                        src={logo}
                        id="focused"
                        className="small-icon"
                    />
                </div>}
                <div className='track-title'>{item.name}</div>
                <div className='track-author'>{item.author}</div>
                </div>
   )}
   </div>
                

        </>
    );
}