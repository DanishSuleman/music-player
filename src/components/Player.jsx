import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import changeActiveState from "../util";
function Player({
  setSongs,
  setCurrentSong,
  songs,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
}) {
  //States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // Event Handlers
  const songPlayHandler = () => {
    if (isPlaying === true) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      const nextSong = songs[(currentIndex + 1) % songs.length];
      await setCurrentSong(nextSong);
      changeActiveState(songs, nextSong, setSongs);
    }
    if (direction === "skip-back") {
      if (currentIndex - 1 === -1) {
        const resetSong = songs[songs.length - 1];
        await setCurrentSong(resetSong);
        changeActiveState(songs, resetSong, setSongs);
        if (isPlaying) audioRef.current.play();
        return;
      } else {
        const prevSong = songs[(currentIndex - 1) % songs.length];
        await setCurrentSong(prevSong);
        changeActiveState(songs, prevSong, setSongs);
      }
    }

    if (isPlaying) audioRef.current.play();
  };

  const seekHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSongOnEnded = songs[(currentIndex + 1) % songs.length];
    await setCurrentSong(nextSongOnEnded);
    changeActiveState(songs, nextSongOnEnded, setSongs);
    setTimeout(() => {
      if (isPlaying) audioRef.current.play();
    }, 10);
  };

  //Functions
  const formattedTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //Styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const seekColor = {
    background: `linear-gradient(to right,${currentSong.color[0]}, ${currentSong.color[1]})`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{formattedTime(songInfo.currentTime)}</p>
        <div style={seekColor} className="track">
          <input
            onChange={seekHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? formattedTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={songPlayHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onEnded={songEndHandler}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default Player;
