import React from "react";
import {Button, Space} from "antd";
import {GithubOutlined, GitlabOutlined, InfoCircleOutlined} from "@ant-design/icons";
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
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                    onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                    onMouseOut={(e) => btnMouseOut(props.majorColor, e)}
                    style={{color: getFontColor(props.majorColor), cursor: "default"}} className={"popupFont"}>
                {"版本：V" + require('../../package.json').version}
            </Button>
        </Space>
    );
}

export default PopupFooterComponent;