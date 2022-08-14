import React from "react";
import changeActiveState from "../util";

function LibrarySong({
  setSongs,
  songs,
  isPlaying,
  audioRef,
  song,
  setCurrentSong,
}) {
  //Event Handlers
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    changeActiveState(songs, song, setSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
