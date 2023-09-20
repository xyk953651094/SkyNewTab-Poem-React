import React from "react";
import {Row, Col, Typography, Button, Space} from "antd";
import {GiftOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function PreferenceHeaderComponent(props: any) {
    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    return (
        <Row align={"middle"}>
            <Col span={12}>
                <Text style={{color: getFontColor(props.minorColor)}}>{"菜单栏"}</Text>
            </Col>
            <Col span={12} style={{textAlign: "right"}}>
                <Button type={"text"} shape={"round"} icon={<GiftOutlined/>}
                        href={"https://afdian.net/a/xyk953651094"} target={"_blank"}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"poemFont"}
                        style={{color: getFontColor(props.minorColor)}}>
                    支持
                </Button>
            </Col>
        </Row>
    );
}

export default PreferenceHeaderComponent;