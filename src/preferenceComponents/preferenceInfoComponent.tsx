import React from "react";
import {Button, Card, Space} from "antd";
import {InfoCircleOutlined, CalendarOutlined, CloudOutlined, ReadOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceInfoComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

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
                        href={"https://www.mxnzp.com/"} target={"_blank"}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"节气来源：https://www.mxnzp.com"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CloudOutlined/>}
                        href={"https://www.jinrishici.com/"} target={"_blank"}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"天气来源：https://www.jinrishici.com"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ReadOutlined/>}
                        href={"https://www.jinrishici.com/"} target={"_blank"}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"诗词来源：https://www.jinrishici.com"}
                </Button>
            </Space>
        </Card>
    );
}

export default PreferenceInfoComponent;