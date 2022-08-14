import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
  libraryStatus,
  setSongs,
  isPlaying,
  audioRef,
  songs,
  setCurrentSong,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            key={song.id}
            setCurrentSong={setCurrentSong}
            song={song}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
