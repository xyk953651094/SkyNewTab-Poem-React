import React from "react";
import {Button, Col, Row, Space, Typography} from "antd";
import {GiftOutlined, NotificationOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function MenuHeaderComponent(props: any) {
    return (
        <Row align={"middle"}>
            <Col span={12}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"菜单栏"}</Text>
            </Col>
            <Col span={12} style={{textAlign: "right"}}>
                <Space>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<NotificationOutlined/>}
                            href={"https://xyk953651094.blogspot.com/"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}}>
                        博客
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                            href={"https://afdian.net/a/xyk953651094"} target={"_self"}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}}>
                        捐助
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}

export default MenuHeaderComponent;