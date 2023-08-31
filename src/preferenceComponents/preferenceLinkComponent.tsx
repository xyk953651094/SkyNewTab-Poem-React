import React from "react";
import {Avatar, Button, Card, Col, Row} from "antd";
import {LinkOutlined} from "@ant-design/icons";
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
        <Card title={"友情链接"} size={"small"}
              extra={<LinkOutlined style={{color: getFontColor(props.minorColor)}}/>}
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
                    <Button type={"text"} shape={"round"}
                            href={"https://hanyu.baidu.com/"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        <Avatar size={16} shape={"square"} src={"https://www.baidu.com/favicon.ico"}/>
                        &nbsp;&nbsp;百度汉语
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={"round"}
                            href={"https://hanyu.sogou.com/"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        <Avatar size={16} shape={"square"} src={"https://www.sogou.com/favicon.ico"}/>
                        &nbsp;&nbsp;搜狗汉语
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={"round"}
                            href={"https://guoxue.baike.so.com/query/index?type=poem&page=1"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        <Avatar size={16} shape={"square"} src={"https://www.so.com/favicon.ico"}/>
                        &nbsp;&nbsp;360国学
                    </Button>
                </Col>
                <Col span="12">
                    <Button type={"text"} shape={"round"}
                            href={"https://www.jetbrains.com/"} target={"_blank"}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        <Avatar size={16} shape={"square"} src={"https://www.jetbrains.com/favicon.ico"}/>
                        &nbsp;&nbsp;JetBrains
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default PreferenceLinkComponent;