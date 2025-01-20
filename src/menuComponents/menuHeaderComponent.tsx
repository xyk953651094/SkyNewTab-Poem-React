import React from "react";
import {Button, Col, Row, Typography, Space, message} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function MenuHeaderComponent(props: any) {
    function toChromeBtnOnClick() {
        window.open("https://chromewebstore.google.com/detail/云开诗词新标签页/hbbkhohnflilcpjkkemkdkdifknebnjf/", "_self");
    }

    function toEdgeBtnOnClick() {
        window.open("https://microsoftedge.microsoft.com/addons/detail/云开诗词新标签页/bjffkcmhfeebpeaifnblceieijbpplhp/", "_self");
    }

    function toFirefoxBtnOnClick() {
        window.open("https://addons.mozilla.org/firefox/addon/云开诗词新标签页/", "_self");
    }

    function toSafariBtnOnClick() {
        message.warning("暂未上架 Safari");
    }

    return (
        <Row align={"middle"}>
            <Col span={6}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"菜单栏"}</Text>
            </Col>
            <Col span={18} style={{textAlign: "right"}}>
                <Space>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<i className="bi bi-browser-chrome"></i>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={toChromeBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<i className="bi bi-browser-edge"></i>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={toEdgeBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<i className="bi bi-browser-firefox"></i>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={toFirefoxBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<i className="bi bi-browser-safari"></i>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={toSafariBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<InfoCircleOutlined />}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"V" + require('../../package.json').version}
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}

export default MenuHeaderComponent;