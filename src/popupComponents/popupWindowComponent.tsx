import React, {useEffect, useState} from 'react';
import "../stylesheets/popupComponent.scss"
import {getFontColor, getWindowClassName} from "../typescripts/publicFunctions";

function PopupWindowComponent(props: any) {
    const [windowClassName, setWindowClassName] = useState(getWindowClassName());

    useEffect(() => {

    });

    return (
        <i className={"chinaWindow iconfont " + windowClassName} style={{color: getFontColor(props.majorColor)}}></i>
    );
}

export default PopupWindowComponent;