import React from "react";
import {Button, Card, Col, Row} from "antd";
import {ExclamationCircleOutlined, InfoCircleOutlined, SendOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceLinkComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
    }
    
    return (
        <Card title={"联系作者"} size={"small"}
              extra={<SendOutlined style={{color: props.minorColor}}/>}
              style={{border: "1px solid " + props.minorColor}}
              headStyle={{
                  backgroundColor: props.majorColor,
                  color: props.minorColor,
                  borderBottom: "2px solid " + props.minorColor,
                  fontFamily: "Times New Roman, cursive, sans-serif"
              }}
              bodyStyle={{backgroundColor: props.majorColor}}
        >
            <Row gutter={[0, 8]}>
                <Col span="12">
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: props.minorColor}}>
                        功能建议
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={"round"} icon={<ExclamationCircleOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: props.minorColor}}>
                        问题反馈
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceLinkComponent;