import React from "react";
import {Button, Popover} from "antd";
import {getFontColor} from "../typescripts/publicFunctions";

function PopoverComponent(props: any) {
    return (
        <Popover
            title={props.popoverTitle}
            content={props.popoverContent}
            placement={props.popoverPlacement}
            color={props.minorColor}
            overlayStyle={{minWidth: props.popoverMinWidth}}
        >
            <Button shape={props.preferenceData.buttonShape}
                    icon={props.buttonIcon}
                    size={"large"}
                    className={"componentTheme poemFont"}
                    style={{
                        backgroundColor: props.minorColor,
                        color: getFontColor(props.minorColor),
                        cursor: "default",
                        display: props.display,
                    }}
            >
                {props.buttonContent}
            </Button>
        </Popover>
    );
}

export default PopoverComponent;