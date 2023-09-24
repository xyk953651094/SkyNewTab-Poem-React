import React from "react";
import {Button, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PopupHeaderComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    return (
        <Space align={"center"}>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DashboardOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor), cursor: "default"}}
                    className={"popupFont"}
            >
                云开诗词新标签页的仪表盘
            </Button>
        </Space>
    );
}

export default PopupHeaderComponent;