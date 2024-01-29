import React from "react";
import {Button, Card, Col, Row} from "antd";
import {GithubOutlined, GitlabOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

function PreferenceHelpComponent(props: any) {
    return (
        <Card title={"帮助文档"} size={"small"}
              extra={<QuestionCircleOutlined style={{color: getFontColor(props.minorColor)}}/>}
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
                            href={"https://xyk953651094.github.io/SkyDocuments/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        GitHub Pages
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GitlabOutlined/>}
                            href={"https://xyk953651094.gitlab.io/SkyDocuments/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        GitLab Pages
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceHelpComponent;