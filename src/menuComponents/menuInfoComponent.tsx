import React from "react";
import {Button, Card, Col, Row, Typography} from "antd";
import {GithubOutlined, GitlabOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function MenuInfoComponent(props: any) {
    return (
        <Card title={<Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"产品信息"}</Text>}
              size={"small"}
              extra={<InfoCircleOutlined style={{color: getFontColor(props.minorColor)}}/>}
              style={{border: "1px solid " + getFontColor(props.minorColor)}}
              styles={{
                  header: {
                      backgroundColor: props.minorColor,
                      color: getFontColor(props.minorColor),
                      borderBottom: "2px solid " + getFontColor(props.minorColor)
                  },
                  body: {
                      backgroundColor: props.minorColor
                  }
              }}
        >
            <Row gutter={[0, 8]}>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                            href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        产品主页
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        产品主页
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                            href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/releases/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        更新日志
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://gitlab.com/xyk953651094/SkyNewTab-React/-/releases/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        更新日志
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                            href={"https://xyk953651094.github.io/SkyDocuments/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        帮助文档
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://xyk953651094.gitlab.io/SkyDocuments/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        帮助文档
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default MenuInfoComponent;