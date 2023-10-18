import React, {useEffect, useState} from 'react';
import {Col, Layout, notification, Row, Space} from "antd";
import "./stylesheets/publicStyles.scss"

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import DailyComponent from "./components/dailyComponent";
import TodoComponent from "./components/todoComponent";
import SunComponent from "./components/sunComponent";
import PoemComponent from "./components/poemComponent";
import WaveComponent from "./components/waveComponent";
import {getFontColor, getPreferenceDataStorage, setColorTheme} from "./typescripts/publicFunctions";
import PreferenceComponent from "./components/preferenceComponent";
import {PreferenceDataInterface} from "./typescripts/publicInterface";
import SearchComponent from "./components/searchComponent";

const {Header, Content, Footer} = Layout;
const $ = require('jquery');
const themeArray = setColorTheme();

function App() {
    const [majorColor] = useState(themeArray.majorColor);
    const [minorColor] = useState(themeArray.minorColor);
    const [svgColors] = useState(themeArray.svgColors);
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());

    function getPreferenceData(value: PreferenceDataInterface) {
        setPreferenceData(value);
    }

    useEffect(() => {
        // 随机颜色主题
        localStorage.setItem("themeArray", JSON.stringify(themeArray));

        // 版本号提醒
        let storageVersion = localStorage.getItem("SkyNewTabPoemReactVersion");
        let currentVersion = require('../package.json').version;
        if(storageVersion !== currentVersion) {
            notification.info({
                message: "已更新至 " + currentVersion,
                description: "详情请前往 GitHub 或 GitLab 查看",
                placement: "bottomLeft",
                duration: 5,
                closeIcon: false
            });
            localStorage.setItem("SkyNewTabPoemReactVersion", currentVersion);
        }

        // 修改弹窗主题
        let bodyEle = $("body");
        bodyEle.bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-item").css({"borderBlockEndColor": getFontColor(minorColor), "padding": "10px, 0"});
            $(".ant-list-item-meta-title").css("color", getFontColor(minorColor));
            $(".ant-list-item-meta-description").css("color", getFontColor(minorColor));
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css("color", getFontColor(minorColor)).addClass("poemFont");
            $(".ant-alert").css("padding", "10px");

            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css({
                    "color": getFontColor(minorColor),
                    "font-family": "'Times New Roman', cursive, sans-serif",
                    "font-size": "20px",
                });
            }

            // toolTip
            let toolTipEle = $(".ant-tooltip");
            if (toolTipEle.length && toolTipEle.length > 0) {
                $(".ant-tooltip-inner").css("color", getFontColor(minorColor)).addClass("poemFont");
            }

            // message
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": minorColor,
                    "color": getFontColor(minorColor)
                });
                $(".ant-message-custom-content > .anticon").css("color", getFontColor(minorColor));
            }

            // notification
            let notificationEle = $(".ant-notification");
            if (notificationEle.length && notificationEle.length > 0) {
                $(".ant-notification-notice").css({"backgroundColor": minorColor});
                $(".ant-notification-notice-icon").css("color", getFontColor(minorColor));
                $(".ant-notification-notice-message").css("color", getFontColor(minorColor));
                $(".ant-notification-notice-description").css("color", getFontColor(minorColor));
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-title").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-form-item-label > label").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-radio-wrapper").children(":last-child").css("color", getFontColor(minorColor)).addClass("poemFont");
            }

            // modal
            let modalEle = $(".ant-modal");
            if (modalEle.length && modalEle.length > 0) {
                $(".ant-modal-content").css("backgroundColor", minorColor);
                $(".ant-modal-title").css({
                    "backgroundColor": minorColor,
                    "color": getFontColor(minorColor)
                }).addClass("poemFont");
                $(".ant-form-item-label > label").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-modal-footer > .ant-btn").css("color", getFontColor(minorColor));
                if(preferenceData.buttonShape === "round") {
                    $(".ant-modal-footer > .ant-btn").addClass("poemFont ant-btn-round ant-btn-text").removeClass("ant-btn-default ant-btn-primary");
                }
                else {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-round ant-btn-default ant-btn-primary").addClass("poemFont ant-btn-text");
                }
                $(".ant-modal-footer > .ant-btn").on("mouseover", (e: any) => {
                    e.currentTarget.style.backgroundColor = majorColor;
                    e.currentTarget.style.color = getFontColor(majorColor);
                });
                $(".ant-modal-footer > .ant-btn").on("mouseout", (e: any) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = getFontColor(minorColor);
                });

                $(".ant-select-selection-item").addClass("poemFont");
            }
        });
    }, [preferenceData.buttonShape, themeArray]);

    return (
        <Layout>
            <Header id={"header"} className={"zIndexMiddle"}>
                <Row justify="center">
                    <Col xs={0} sm={0} md={0} lg={9} xl={9} xxl={9}>
                        <Space>
                            <SearchComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <GreetComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <WeatherComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                        </Space>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={9} xl={9} xxl={9} style={{textAlign: "right"}}>
                        <Space>
                            <DailyComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <TodoComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <PreferenceComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                                getPreferenceData={getPreferenceData}
                            />
                        </Space>
                    </Col>
                    <Col xs={22} sm={22} md={22} lg={0} xl={0} xxl={0} style={{textAlign: "right"}}>
                        <PreferenceComponent
                            majorColor={majorColor}
                            minorColor={minorColor}
                            preferenceData={preferenceData}
                            getPreferenceData={getPreferenceData}
                        />
                    </Col>
                </Row>
                <SunComponent sunColors={svgColors}/>
            </Header>
            <Content id={"content"} className="alignCenter">
                <PoemComponent
                    minorColor={minorColor}
                    preferenceData={preferenceData}
                />
            </Content>
            <Footer id={"footer"}>
                <WaveComponent waveColors={svgColors}/>
            </Footer>
        </Layout>
    );
}

export default App;
