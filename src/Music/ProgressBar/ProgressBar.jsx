import React from "react";
import "./ProgressBar.css";

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showTooltip: false};
    }
    render() {
        return (
            <div className="progress">
                <input
                    type="range"
                    min="0"
                    max="100"
                    className="slider"
                    value={this.props.volume}
                    onChange={(e) => this.props.setVolume(e.target.value)}
                    onMouseEnter={() => this.setState({showTooltip: true})}
                    onMouseLeave={() => this.setState({showTooltip: false})}
                />
                {this.state.showTooltip ? <span className="tooltip">{ this.props.volume}</span> : null}
            </div>
        );
    }
}
