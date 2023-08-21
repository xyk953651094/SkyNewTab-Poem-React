import React, {useEffect, useState} from 'react';
import "../stylesheets/windowComponent.scss"
import {getWindowClassName} from "../typescripts/publicFunctions";

function WindowComponent(props: any) {
    const [windowClassName, setWindowClassName] = useState(getWindowClassName());

    useEffect(() => {

    });

    return (
        <i className={"chinaObject iconfont " + windowClassName} style={{color: props.fontColor}}></i>
    );
}

export default WindowComponent;