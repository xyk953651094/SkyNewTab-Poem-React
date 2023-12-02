import React from "react";
import {Button, Row} from "antd";
import {ToTopOutlined} from "@ant-design/icons";
import {getFontColor, btnMouseOver, btnMouseOut} from "../typescripts/publicFunctions";

function PreferenceFooterComponent(props: any) {
    function toTopBtnOnClick() {
        let drawerContent: HTMLElement | null = document.getElementById("drawerContent");
        if (drawerContent) {
            drawerContent.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <Row justify={"center"}>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ToTopOutlined/>}
                    onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                    onClick={toTopBtnOnClick}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                {"回到顶部"}
            </Button>
        </Row>
    );
}

export default PreferenceFooterComponent;