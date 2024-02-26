import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, GitlabOutlined, NotificationOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PopupFooterComponent(props: any) {
    return (
        <Space>
            <Button type={"text"} size={"large"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                产品主页
            </Button>
            <Button type={"text"} size={"large"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                产品主页
            </Button>
            <Button type={"text"} size={"large"} shape={props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                    href={"https://xyk953651094.blogspot.com/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                博客
            </Button>
            <Button type={"text"} size={"large"} shape={props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                    href={"https://afdian.net/a/xyk953651094/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                捐助
            </Button>
        </Space>
    );
}

export default PopupFooterComponent;