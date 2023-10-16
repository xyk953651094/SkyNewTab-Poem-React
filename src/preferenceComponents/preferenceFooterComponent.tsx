import React from "react";
import {Button, Space} from "antd";
import {GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
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

    return (
        <Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                GitHub
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined />}
                    href={"https://gitlab.com/xyk953651094"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                GitLab
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                    href={"https://xyk953651094.blogspot.com"} target={"_blank"}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"}
                    style={{color: getFontColor(props.minorColor)}}>
                博客
            </Button>
        </Space>
    );
}

export default PreferenceFooterComponent;