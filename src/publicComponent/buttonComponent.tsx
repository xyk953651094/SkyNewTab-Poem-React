import React from "react";
import {Button} from "antd";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function ButtonComponent(props: any) {
    return (
        <Button type={"text"}
                shape={props.buttonShape}
                icon={props.buttonIcon}
                className={"poemFont"}
                style={{color: getFontColor(props.minorColor), cursor: props.buttonCursor}}
                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                onClick={props.buttonOnClick}
        >
            {props.buttonContent}
        </Button>
    );
}

export default ButtonComponent;