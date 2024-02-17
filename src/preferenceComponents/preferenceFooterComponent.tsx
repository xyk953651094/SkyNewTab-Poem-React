import React from "react";
import {Button, Space} from "antd";
import {GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PreferenceFooterComponent(props: any) {
    return (
        <Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                GitHub
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                GitLab
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                    href={"https://xyk953651094.blogspot.com/"} target={"_self"}
                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                    className={"poemFont"}
                    style={{color: getFontColor(props.minorColor)}}>
                Blogger
            </Button>
        </Space>
    );
}

export default PreferenceFooterComponent;