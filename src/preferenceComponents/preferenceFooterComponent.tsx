import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, MessageOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceFooterComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
    }
    
    return (
        <Space>
            <Button type={"text"} shape={"round"} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"}
                    style={{color: props.minorColor}}>
                主页
            </Button>
            <Button type={"text"} shape={"round"} icon={<MessageOutlined/>}
                    href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"}
                    style={{color: props.minorColor}}>
                博客
            </Button>
            <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                    href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"}
                    style={{color: props.minorColor}}>
                支持
            </Button>
        </Space>
    );
}

export default PreferenceFooterComponent;