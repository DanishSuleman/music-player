const changeActiveState = (songs, currentSong, setSongs) => {
  const newSongs = songs.map((eachsong) => {
    if (eachsong.id === currentSong.id) {
      return {
        ...eachsong,
        active: true,
      };
    } else {
      return {
        ...eachsong,
        active: false,
      };
    }
  });
  setSongs(newSongs);
};

export default changeActiveState;
