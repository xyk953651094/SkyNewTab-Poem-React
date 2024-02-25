import React from "react";
import {Button, Card, Col, Row} from "antd";
import {DislikeOutlined, GithubOutlined, GitlabOutlined, LikeOutlined, MailOutlined, BulbOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function MenuContactComponent(props: any) {
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
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                            href={"https://github.com/xyk953651094/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        作者主页
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://gitlab.com/xyk953651094/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        作者主页
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<LikeOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        功能建议
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DislikeOutlined/>}
                            href={"mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        问题反馈
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<BulbOutlined />}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        联系作者前请先查阅帮助文档
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default MenuContactComponent;