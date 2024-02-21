import React from "react";
import {Button, Card, Col, Row} from "antd";
import {GithubOutlined, GitlabOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function MenuInfoComponent(props: any) {
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
            <Row>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GithubOutlined/>}
                            href={"https://github.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        GitHub 产品主页
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://gitlab.com/xyk953651094/SkyNewTab-Poem-React/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            style={{color: getFontColor(props.minorColor)}} className={"poemFont"}>
                        GitLab 产品主页
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default MenuInfoComponent;