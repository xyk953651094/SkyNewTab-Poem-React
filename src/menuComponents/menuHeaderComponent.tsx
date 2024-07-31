import React from "react";
import {Button, Col, Row, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function MenuHeaderComponent(props: any) {
    return (
        <Row align={"middle"}>
            <Col span={6}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"菜单栏"}</Text>
            </Col>
            <Col span={18} style={{textAlign: "right"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape}
                        icon={<InfoCircleOutlined />}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                    {"V" + require('../../package.json').version}
                </Button>
            </Col>
        </Row>
    );
}

export default MenuHeaderComponent;