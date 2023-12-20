import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row, Space} from "antd";
import {AppstoreOutlined, GithubOutlined, GitlabOutlined, ProfileOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PreferenceProductComponent(props: any) {
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");

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
                <Col span="19">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ProfileOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开帮助文档"}
                    </Button>
                </Col>
                <Col span="5">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyDocuments/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyDocuments/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
                <Col span="19">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<AppstoreOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开壁纸（React）"}
                    </Button>
                </Col>
                <Col span="5">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyWallpaper-Electron/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyWallpaper-Electron/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
                <Col span="19">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className="bi bi-puzzle"/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开新标签页（React）"}
                    </Button>
                </Col>
                <Col span="5">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-React/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
                <Col span="19">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className="bi bi-puzzle"/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开新标签页（Vue）"}
                    </Button>
                </Col>
                <Col span="5">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-Vue/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
                <Col span="19">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className="bi bi-puzzle"/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"云开诗词新标签页（Angular）"}
                    </Button>
                </Col>
                <Col span="5">
                    <Space>
                        <Button type={"text"} shape={buttonShape} icon={<GithubOutlined/>}
                                href={"https://github.com/xyk953651094/SkyNewTab-Poem-Angular/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                        <Button type={"text"} shape={buttonShape} icon={<GitlabOutlined/>}
                                href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-Angular/"} target={"_blank"}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceProductComponent;