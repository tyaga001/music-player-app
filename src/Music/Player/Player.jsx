import "./Player.css";
import { useEffect, useRef, useState } from "react";
import { forwardsSvg, backwardsSvg, shuffleSvg } from "../svg";
import Progress from "../ProgressBar/ProgressBar";
import SongTime from "./SongTime";

export default function Player ({
    selectedSongId,
    defaultSong,
    songs,
    selectSongById,
    volume,
}) {

    const [shuffled, setShuffled] = useState(false);
    const [currentTime, setCurrenTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const [playerState, setPlayerState] = useState(false);
    const audioRef = useRef();
    let intervalRef = useRef();
    let clicked = false;

    const spaceDownFunc = (event) => {
        if (event.keyCode === 32 && !clicked) {
            clicked = true;
            document.getElementsByClassName("main-control")[0].click();
        }
    };
    const spaceUpFunc = (event) => {
        if (event.keyCode === 32 && clicked) {
            clicked = false;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", spaceDownFunc);
        document.addEventListener("keyup", spaceUpFunc);
       return () => {
          clearInterval(intervalRef.current);
       }
    }, []);

    // useEffect(() => {
    //     return () => {
    //         // document.removeEventListener(spaceDownFunc);
    //         // document.removeEventListener(spaceUpFunc);
    //         clearInterval(intervalRef.current);
    //     }
    // })

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
        // dispatch({ type: "PLAYER_STATE_SELECTED", payload: 1 });
        setPlayerState(true);
        // console.log(audioRef.current.duration);
        // document.getElementById("focus-link").click();
        // window.history.pushState({}, "", "/");
    }, [selectedSongId]);
    useEffect(() => {
        // dispatch({ type: "PLAYER_STATE_SELECTED", payload: 0 });
        // audioRef.current.pause();
        if (playerState) {
            audioRef.current.play();
            // dispatch({ type: "PLAYER_STATE_SELECTED", payload: 1 });
        } else {
            audioRef.current.pause();
            // dispatch({ type: "PLAYER_STATE_SELECTED", payload: 0 });
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
                    // console.log("shuffle: " + !shuffled);
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
                    // dispatch({
                    //     type: "SET_DURATION",
                    //     payload: audioRef.current.duration,
                    // });
                   setDuration(audioRef.current.duration);
                   intervalRef.current =  setInterval(() => {
                        // dispatch({
                        //     type: "SET_CURRENT_LOCATION",
                        //     payload: audioRef.current.currentTime,
                        // });
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


