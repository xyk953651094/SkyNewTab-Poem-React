import React, {useEffect} from 'react';
import "../stylesheets/waveComponent.scss"

function WaveComponent(props: any) {
    useEffect(() => {

    });

    return (
        <div className="waveSvg">
            <svg className="waves" viewBox="0 24 150 24" preserveAspectRatio="none">
                <defs>
                    <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g>
                    <use className="wave" xlinkHref="#wave" fill={props.waveColor[0]} x="50" y="0"></use>
                    <use className="wave" xlinkHref="#wave" fill={props.waveColor[1]} x="50" y="2"></use>
                    <use className="wave" xlinkHref="#wave" fill={props.waveColor[2]} x="50" y="4"></use>
                </g>
            </svg>
        </div>
    );
}

export default WaveComponent;