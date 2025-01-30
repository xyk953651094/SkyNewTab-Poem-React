import React, {useEffect, useState} from "react";
import {Layout, List, Space} from "antd";
import "../stylesheets/popupComponent.scss"
import PopupPoemComponent from "../popupComponents/popupPoemComponent";
import PopupFooterComponent from "../popupComponents/popupFooterComponent";
import PopupWindowComponent from "../popupComponents/popupWindowComponent";
import PopupObjectComponent from "../popupComponents/popupObjectComponent";
import PopupStatusComponent from "../popupComponents/popupStatusComponent";
import PopupHeaderComponent from "../popupComponents/popupHeaderComponent";
import {getFontColor, getPreferenceDataStorage, setTheme, setFont} from "../typescripts/publicFunctions";

const {Header, Content, Footer} = Layout;
const $ = require("jquery")

function PopupComponent() {
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());

    useEffect(() => {
        // 设置颜色主题
        let tempTheme;
        let tempThemeStorage = localStorage.getItem("theme");
        if (tempThemeStorage) {
            tempTheme = JSON.parse(tempThemeStorage);
            let bodyEle = $("body");
            bodyEle.css("backgroundColor", tempTheme.majorColor + " !important");
        } else {
            tempTheme = setTheme();
        }
        setMajorColor(tempTheme.majorColor);
        setMinorColor(tempTheme.minorColor);

        // 设置字体
        setFont(".popupFont", preferenceData);
    }, [preferenceData])

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