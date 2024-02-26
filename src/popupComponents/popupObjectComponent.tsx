import React, {useEffect, useState} from 'react';
import "../stylesheets/popupComponent.scss"
import {getFontColor, getObjectClassName} from "../typescripts/publicFunctions";

function PopupObjectComponent(props: any) {
    const [objectClassName, setObjectClassName] = useState(getObjectClassName());

    useEffect(() => {

    });

    return (
        <i className={"chinaObject iconfont " + objectClassName} style={{color: getFontColor(props.majorColor)}}></i>
    );
}

export default PopupObjectComponent;