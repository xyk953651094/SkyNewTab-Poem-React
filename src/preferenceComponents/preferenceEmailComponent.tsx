import React from "react";
import {Button, Card, Col, Row} from "antd";
import {ExclamationCircleOutlined, InfoCircleOutlined, MailOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceLinkComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    return (
        <Card title={"联系作者"} size={"small"}
              extra={<MailOutlined style={{color: getFontColor(props.minorColor)}}/>}
              style={{border: "1px solid " + getFontColor(props.minorColor)}}
              headStyle={{
                  backgroundColor: props.minorColor,
                  color: getFontColor(props.minorColor),
                  borderBottom: "2px solid " + getFontColor(props.minorColor),
                  fontFamily: "Times New Roman, cursive, sans-serif"
              }}
              bodyStyle={{backgroundColor: props.minorColor}}
        >
            <Row gutter={[0, 8]}>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        功能建议
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ExclamationCircleOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        问题反馈
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceLinkComponent;