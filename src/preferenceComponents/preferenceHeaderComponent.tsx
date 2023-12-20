import React from "react";
import {Button, Col, Row, Typography} from "antd";
import {GiftOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function PreferenceHeaderComponent(props: any) {
    return (
        <Row align={"middle"}>
            <Col span={12}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"菜单栏"}</Text>
            </Col>
            <Col span={12} style={{textAlign: "right"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<GiftOutlined/>}
                        href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"}
                        style={{color: getFontColor(props.minorColor)}}>
                    支持
                </Button>
            </Col>
        </Row>
    );
}

export default PreferenceHeaderComponent;