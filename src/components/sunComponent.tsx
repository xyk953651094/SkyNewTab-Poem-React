import React, {useEffect} from 'react';
import "../stylesheets/sunComponent.scss"

function SunComponent(props: any) {
    useEffect(() => {

    });

    return (
        <div className="sunDiv">
            <svg className="sunSvg">
                <circle id="sunCircle3" className="svgAnimation" cx="200" cy="0" r="140" fill={props.sunColor[2]}/>
                <circle id="sunCircle2" className="svgAnimation" cx="200" cy="0" r="130" fill={props.sunColor[1]}/>
                <circle id="sunCircle1" className="svgAnimation" cx="200" cy="0" r="120" fill={props.sunColor[0]}/>
            </svg>
        </div>
    );
}

export default SunComponent;