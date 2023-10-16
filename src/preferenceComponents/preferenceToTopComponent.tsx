import React from "react";
import {Button, Row} from "antd";
import {ToTopOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceFooterComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function toTopBtnOnClick() {
        let drawerContent: HTMLElement | null = document.getElementById("drawerContent");
        if (drawerContent) {
            drawerContent.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <Row justify={"center"}>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ToTopOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    onClick={toTopBtnOnClick}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                {"回到顶部"}
            </Button>
        </Row>
    );
}

export default PreferenceFooterComponent;