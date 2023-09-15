import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, NotificationOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PopupFooterComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    return (
        <Space>
            <Button type={"text"} shape={"round"} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor)}} className={"popupFont"}>
                主页
            </Button>
            <Button type={"text"} shape={"round"} icon={<NotificationOutlined/>}
                    href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor)}} className={"popupFont"}>
                博客
            </Button>
            <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                    href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor)}} className={"popupFont"}>
                支持
            </Button>
        </Space>
    );
}

export default PopupFooterComponent;