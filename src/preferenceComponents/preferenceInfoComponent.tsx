import React from "react";
import {Button, Card, Space} from "antd";
import {CalendarOutlined, CloudOutlined, CodeOutlined, InfoCircleOutlined, ReadOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PreferenceInfoComponent(props: any) {
    return (
        <Card title={"产品信息"} size={"small"}
              extra={<InfoCircleOutlined style={{color: getFontColor(props.minorColor)}}/>}
              style={{border: "1px solid " + getFontColor(props.minorColor)}}
              headStyle={{
                  backgroundColor: props.minorColor,
                  color: getFontColor(props.minorColor),
                  borderBottom: "2px solid " + getFontColor(props.minorColor),
                  fontFamily: "Times New Roman, cursive, sans-serif"
              }}
              bodyStyle={{backgroundColor: props.minorColor}}
        >
            <Space direction={"vertical"}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                        href={"https://www.mxnzp.com/"} target={"_self"}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"节气来源：https://www.mxnzp.com"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CloudOutlined/>}
                        href={"https://www.jinrishici.com/"} target={"_self"}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"天气来源：https://www.jinrishici.com"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ReadOutlined/>}
                        href={"https://www.jinrishici.com/"} target={"_self"}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"诗词来源：https://www.jinrishici.com"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CodeOutlined/>}
                        href={"https://www.jetbrains.com.cn/community/opensource/#support/"} target={"_self"}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"开发支持：JetBrains 免费许可证计划"}
                </Button>
            </Space>
        </Card>
    );
}

export default PreferenceInfoComponent;