import React from "react";
import "./SongTime.css";

export default class SongTime extends React.Component {
    render() {
        return (
            <div className="music-timer">
                <div
                    className="completed"
                    style={{
                        width: `${
                            (this.props.currentLocation / this.props.duration) *
                            100
                        }%`,
                    }}
                ></div>
            </div>
        );
    }
}