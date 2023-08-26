import React, {useEffect, useState} from 'react';
import "../stylesheets/popupComponent.scss"
import {getWindowClassName} from "../typescripts/publicFunctions";

function PopupWindowComponent(props: any) {
    const [windowClassName, setWindowClassName] = useState(getWindowClassName());

    useEffect(() => {

    });

    return (
        <i className={"chinaWindow iconfont " + windowClassName} style={{color: props.fontColor}}></i>
    );
}

export default PopupWindowComponent;