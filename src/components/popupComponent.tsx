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
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = minorColor;
        e.currentTarget.style.color = getFontColor(minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = minorColor;
    }

    useEffect(() => {
        let bodyEle = $("body");

        // 随机颜色主题
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        bodyEle.css("background-color", themeArray[randomNum].majorColor);
        setMajorColor(themeArray[randomNum].majorColor);
        setMinorColor(themeArray[randomNum].minorColor);
    }, [])
   
    return (
        <Layout className={"popupLayout"}>
            <Header className={"popupHeader"}>
                <Space align={"center"}>
                    <Button type={"text"} shape={"round"} icon={<DashboardOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            style={{color: minorColor, cursor: "default"}}
                            className={"popupFont"}
                    >
                        云开诗词新标签页的仪表盘
                    </Button>
                </Space>
            </Header>
            <Content className={"popupContent center"}>
                <List>
                    <List.Item style={{borderBlockEndColor: minorColor}}>
                        <Space>
                            <PopupObjectComponent minorColor={minorColor}/>
                            <PopupPoemComponent minorColor={minorColor}/>
                            <PopupWindowComponent minorColor={minorColor}/>
                        </Space>
                    </List.Item>
                </List>
            </Content>
            <Footer className={"popupFooter"}>
                <PopupFooterComponent minorColor={minorColor}/>
            </Footer>
        </Layout>
    );
}

export default PopupComponent;