import React from "react";
import {Button, Space} from "antd";
import {GiftOutlined, GithubOutlined, GitlabOutlined, WechatOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PopupFooterComponent(props: any) {
    return (
        <Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                    href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                产品主页
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                    href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                产品主页
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<WechatOutlined />}
                    href={"https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                公众号
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className="bi bi-rss-fill"></i>}
                    href={"https://xyk953651094.blogspot.com/"} target={"_blank"}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor)}} className={"popupFont"}>
                博客
            </Button>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GiftOutlined/>}
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