import React, {useEffect, useState} from "react";
import {Button, Layout, List, Space} from "antd";
import {DashboardOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {defaultPreferenceData, themeArray} from "../typescripts/publicConstants";
import {getFontColor} from "../typescripts/publicFunctions";
import PopupPoemComponent from "../popupComponents/popupPoemComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import PopupWindowComponent from "../popupComponents/popupWindowComponent";
import PopupObjectComponent from "../popupComponents/popupObjectComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

function PopupComponent() {
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");
    const [preferenceData, setPreferenceData] = useState(defaultPreferenceData);

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = minorColor;
        e.currentTarget.style.color = getFontColor(minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = minorColor;
    }

    useEffect(() => {
        // 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        setPreferenceData(tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData));

        // 设置颜色主题
        let bodyEle = $("body");
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        let themeColor = themeArray[randomNum];
        let tempThemeColor = localStorage.getItem("themeColor");
        if (tempThemeColor) {
            themeColor = JSON.parse(tempThemeColor);
        }
        bodyEle.css("backgroundColor", themeColor.majorColor + " !important");
        setMajorColor(themeColor.majorColor);
        setMinorColor(themeColor.minorColor);
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
            <Content className={"popupContent"}>
                <List>
                    <List.Item className={"alignCenter"} style={{borderBlockEndColor: minorColor}}>
                        <PopupStatusComponent minorColor={minorColor} preferenceData={preferenceData}/>
                    </List.Item>
                    <List.Item className={"alignCenter"}>
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