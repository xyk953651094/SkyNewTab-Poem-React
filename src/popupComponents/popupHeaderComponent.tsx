import React from "react";
import {Button, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PopupHeaderComponent(props: any) {
    return (
        <Space align={"center"}>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DashboardOutlined/>}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    style={{color: getFontColor(props.minorColor), cursor: "default"}}
                    className={"popupFont"}
            >
                云开诗词新标签页的仪表盘
            </Button>
        </Space>
    );
}

export default PopupHeaderComponent;