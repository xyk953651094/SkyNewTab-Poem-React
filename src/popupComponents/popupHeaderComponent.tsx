import React from "react";
import {Button, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PopupHeaderComponent(props: any) {
    return (
        <Space align={"center"}>
            <Button type={"text"} size={"large"} shape={props.preferenceData.buttonShape} icon={<DashboardOutlined/>}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor), cursor: "default"}}
                    className={"popupFont"}
            >
                云开诗词新标签页的仪表盘
            </Button>
        </Space>
    );
}

export default PopupHeaderComponent;