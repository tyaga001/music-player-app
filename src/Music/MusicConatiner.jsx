import React, { useEffect, useState } from "react";
import SongList from "./SongList.jsx/SongList";
import Player from "./Player/Player";
import SongDetail from "./SongDetails/SongDetails";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
Session.addAxiosInterceptors(axios);
export default function MusicContainer() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(0);
  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        "https://functions-custom-tyagi.harperdbcloud.com/ToDoApi/songs"
      );
      setSongs(resp.data);
    })();
  }, []);

  return (
    <>
      {songs.length > 0 && (
        <SongDetail selectedSongId={selectedSong} songs={songs} />
      )}
      <SongList
        selectedSong={selectedSong}
        songs={songs}
        selectedSongId={(id) => setSelectedSong(id)}
      />
      {songs.length > 0 && (
        <Player
          songs={songs}
          selectedSongId={selectedSong}
          selectSongById={(id) => setSelectedSong(id)}
        />
      )}
    </>
  );
}
