import "./Player.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { forwardsSvg, backwardsSvg, shuffleSvg } from "../svg";
import Progress from "../ProgressBar/ProgressBar";
import SongTime from "./SongTime";

export default function Player ({
    selectedSongId,
    songs,
    selectSongById
}) {

    const [shuffled, setShuffled] = useState(false);
    const [currentTime, setCurrenTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const [playerState, setPlayerState] = useState(false);
    const audioRef = useRef();
    let intervalRef = useRef();
    let clicked = useRef(false);

    const spaceDownFunc = useCallback(event => {
        if (event.keyCode === 32 && !clicked.current) {
            clicked.current = true;
            document.getElementsByClassName("main-control")[0].click();
        }
    }, []);
    const spaceUpFunc = useCallback(event => {
        if (event.keyCode === 32 && clicked.current) {
            clicked.current = false;
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", spaceDownFunc);
        document.addEventListener("keyup", spaceUpFunc);
       return () => {
          clearInterval(intervalRef.current);
          document.removeEventListener("keydown", spaceDownFunc);
          document.removeEventListener("keyup", spaceUpFunc);
       }
    }, [spaceDownFunc, spaceUpFunc]);

     if (selectedSongId < 0 || selectedSongId > songs.length - 1) {
        selectSongById(0);
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = currentVolume / 500;
        }
    }, [currentVolume]);

    const onMusicPlay = (e) => {
        e.preventDefault();
        setPlayerState(prev => !prev);
    };

    const onBackwardClick = () => {
        if (selectedSongId > 0) {
            selectSongById(selectedSongId - 1);
        }
    };
    const onForwardClick = () => {
        if (selectedSongId < songs.length - 1) {
            selectSongById(selectedSongId + 1);
        }
    };

    useEffect(() => {
        setPlayerState(true)
    }, [selectedSongId])

    useEffect(() => {
        if (playerState) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [playerState, selectedSongId]);

    return (
        <div id="player">
            <SongTime currentLocation={currentTime} duration={duration}/>
            <div
                className="control"
                id={shuffled ? `active` : null}
                onClick={() => {
                    setShuffled(!shuffled);
                }}
            >
                {shuffleSvg}
            </div>
            <div className="control" onClick={onBackwardClick}>
                {backwardsSvg}
            </div>
            <div className="main-control control" onClick={onMusicPlay}>
                <i
                    className={`fas fa-${
                        playerState ? "pause" : "play"
                    }-circle`}
                ></i>
            </div>
            <div className="control" onClick={onForwardClick}>
                {forwardsSvg}
            </div>
            <Progress value={currentVolume}  setVolume = {vol => setCurrentVolume(vol)}/>
            

            <audio
                id="main-track"
                controls
                src={songs[selectedSongId].url}
                preload="true"
                onEnded={() => {
                    selectSongById(
                        shuffled
                            ? Math.round(Math.random() * songs.length)
                            : selectedSongId + 1
                    );
                }}
                onLoadedMetadata={() => {
                   setDuration(audioRef.current.duration);
                   intervalRef.current =  setInterval(() => {
                        if (audioRef.current) {
                        setCurrenTime( audioRef.current.currentTime)
                        } else {
                            clearInterval(intervalRef.current)
                        }
                    }, 1000);
                }}
                ref={audioRef}
                hidden
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </div>
    );
};


