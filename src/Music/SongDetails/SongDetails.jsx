import "./SongDetail.css";


export default function SongDetail ({
  selectedSongId = -1,
  defaultSong,
  selectSong,
  songs,
}) {
  const songData = () => {
    if (selectedSongId >= 0) {
      return (
        <>
          <div className="now-playing">
            <div id="active">
              <strong>Now playing</strong>
            </div>
            <div className="header">{songs[selectedSongId].name}</div>
          </div>
          <div className="album-img">
            {/* <img
              src={songs[selectedSongId].links.images[1].url}
              alt={songs[selectedSongId].name}
            /> */}
          </div>
          <div className="artist-img">
            <img
              src={songs[selectedSongId].links.images[0].url}
              alt={songs[selectedSongId].author}
            />
            <p className="artist-name">{songs[selectedSongId].author}</p>
          </div>
        </>
      );
    } else {
      selectSong(defaultSong);
      return null;
    }
  };

  return (
    <div
      className="song-detail"
      style={{
        backgroundImage: `url(
          ${songs[selectedSongId].links.images[1].url}
        )`,
      }}
    >
      {songData()}
    </div>
  );
};
