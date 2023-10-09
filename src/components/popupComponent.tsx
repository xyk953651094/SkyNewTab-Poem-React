import React, {useEffect, useState} from "react";
import {Layout, List, Space} from "antd";
import "../stylesheets/popupComponent.scss"
import {defaultPreferenceData, lightThemeArray} from "../typescripts/publicConstants";
import PopupPoemComponent from "../popupComponents/popupPoemComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import PopupWindowComponent from "../popupComponents/popupWindowComponent";
import PopupObjectComponent from "../popupComponents/popupObjectComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";
import PopupHeaderComponent from "../popupComponents/popupHeaderComponent";
import {getFontColor, setColorTheme} from "../typescripts/publicFunctions";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

function PopupComponent() {
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");
    const [preferenceData, setPreferenceData] = useState(defaultPreferenceData);

    useEffect(() => {
        // 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        setPreferenceData(tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData));

        // 设置颜色主题
        let themeArray;
        let tempThemeArray = localStorage.getItem("themeArray");
        if (tempThemeArray) {
            themeArray = JSON.parse(tempThemeArray);
            let bodyEle = $("body");
            bodyEle.css("backgroundColor", themeArray.minorColor + " !important");
        }
        else {
            themeArray = setColorTheme();
        }
        setMajorColor(themeArray.majorColor);
        setMinorColor(themeArray.minorColor);
    }, [])

    return (
        <Layout className={"popupLayout"}>
            <Header className={"popupHeader"}>
                <PopupHeaderComponent
                    majorColor={majorColor}
                    minorColor={minorColor}
                    preferenceData={preferenceData}
                />
            </Header>
            <Content className={"popupContent"}>
                <List>
                    <List.Item className={"alignCenter"} style={{borderBlockEndColor: getFontColor(minorColor)}}>
                        <PopupStatusComponent
                            majorColor={majorColor}
                            minorColor={minorColor}
                            preferenceData={preferenceData}
                        />
                    </List.Item>
                    <List.Item className={"alignCenter"}>
                        <Space>
                            <PopupObjectComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                            />
                            <PopupPoemComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <PopupWindowComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                            />
                        </Space>
                    </List.Item>
                </List>
            </Content>
            <Footer className={"popupFooter"}>
                <PopupFooterComponent
                    majorColor={majorColor}
                    minorColor={minorColor}
                    preferenceData={preferenceData}
                />
            </Footer>
        </Layout>
    );
}

export default PopupComponent;