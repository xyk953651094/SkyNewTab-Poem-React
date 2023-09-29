import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Space} from "antd";
import {AppstoreOutlined, GithubOutlined, GitlabOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

function PreferenceLinkComponent(props: any) {
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    useEffect(() => {
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");
    }, [props.preferenceData.buttonShape])

    return (
        <Card title={"更多产品"} size={"small"}
              extra={<AppstoreOutlined style={{color: getFontColor(props.minorColor)}}/>}
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
                <Col span="16">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开新标签页（React）"}
                    </Button>
                </Col>
                <Col span="8">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                                onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined />}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                                onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
                <Col span="16">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开新标签页（Vue）"}
                    </Button>
                </Col>
                <Col span="8">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined />}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceLinkComponent;