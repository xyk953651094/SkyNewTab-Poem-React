import React, {useEffect, useState} from "react";
import {Row, Col, Button, Layout, List, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {getFontColor} from "../typescripts/publicFunctions";
import PopupPoemComponent from "../popupComponents/popupPoemComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import PopupWindowComponent from "../popupComponents/popupWindowComponent";
import PopupObjectComponent from "../popupComponents/popupObjectComponent";
import {themeArray} from "../typescripts/publicConstants";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

function PopupComponent() {
    const [fontColor, setFontColor] = useState("#ffffff");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = fontColor;
        e.currentTarget.style.color = getFontColor(fontColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = fontColor;
    }

    useEffect(() => {
        let bodyEle = $("body");

        // 随机颜色主题
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        bodyEle.css("background-color", themeArray[randomNum].bodyBackgroundColor);
        setFontColor(themeArray[randomNum].fontColor);
    }, [])
   
    return (
        <Layout className={"popupLayout"}>
            <Header className={"popupHeader"}>
                <Space align={"center"}>
                    <Button type={"text"} shape={"round"} icon={<DashboardOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            style={{color: fontColor, cursor: "default"}}
                            className={"popupFont"}
                    >
                        云开诗词新标签页的仪表盘
                    </Button>
                </Space>
            </Header>
            <Content className={"popupContent center"}>
                <List>
                    <List.Item style={{borderBlockEndColor: fontColor}}>
                        <PopupPoemComponent fontColor={fontColor}/>

                        {/*<Row gutter={16}>*/}
                        {/*    <Col span={6}>*/}
                        {/*        <PopupObjectComponent fontColor={fontColor}/>*/}
                        {/*    </Col>*/}
                        {/*    <Col span={12} className={"center"}>*/}
                        {/*        <PopupPoemComponent fontColor={fontColor}/>*/}
                        {/*    </Col>*/}
                        {/*    <Col span={6}>*/}
                        {/*        <PopupWindowComponent fontColor={fontColor}/>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </List.Item>
                </List>
            </Content>
            <Footer className={"popupFooter"}>
                <PopupFooterComponent fontColor={fontColor}/>
            </Footer>
        </Layout>
    );
}

export default PopupComponent;