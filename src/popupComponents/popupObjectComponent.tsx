import React, {useEffect, useState} from 'react';
import "../stylesheets/popupComponent.scss"
import {getObjectClassName} from "../typescripts/publicFunctions";

function PopupObjectComponent(props: any) {
    const [objectClassName, setObjectClassName] = useState(getObjectClassName());

    useEffect(() => {

    });

    return (
        <i className={"chinaObject iconfont " + objectClassName} style={{color: props.minorColor}}></i>
    );
}

export default PopupObjectComponent;