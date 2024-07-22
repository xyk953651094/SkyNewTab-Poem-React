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
import SearchComponent from "./components/searchComponent";
import ClockComponent from "./components/clockComponent";
import FocusComponent from "./components/focusComponent";
import MenuComponent from "./components/menuComponent";
import {
    getFontColor,
    getHolidayDataStorage,
    getPreferenceDataStorage, resetRadioColor, resetSwitchColor, setFont,
    setTheme
} from "./typescripts/publicFunctions";
import {PreferenceDataInterface} from "./typescripts/publicInterface";
import {poemTopics} from "./typescripts/publicConstants";
import $ from "jquery";

const {Header, Content, Footer} = Layout;

function App() {
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");
    const [svgColors, setSvgColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());
    const [holidayData, setHolidayData] = useState(getHolidayDataStorage());

    function getTheme(value: any) {
        setMajorColor(value.majorColor);
        setMinorColor(value.minorColor);
        setSvgColors(value.svgColors);
    }

    function getPreferenceData(value: PreferenceDataInterface) {
        setPreferenceData(value);
    }

    function getHolidayData(value: any) {
        setHolidayData(value);
    }

    useEffect(() => {
        // 获取颜色主题
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
        setSvgColors(tempTheme.svgColors);

        // 设置字体
        setFont(".poemFont", preferenceData);

        // 版本号提醒
        let storageVersion = localStorage.getItem("SkyNewTabPoemReactVersion");
        let currentVersion = require('../package.json').version;
        if (storageVersion !== currentVersion) {
            notification.open({
                icon: null,
                message: "已更新至版本 V" + currentVersion,
                description: "详细内容请前往菜单栏更新日志查看",
                placement: "bottomLeft",
                duration: 5,
                closeIcon: false
            });
            localStorage.setItem("SkyNewTabPoemReactVersion", currentVersion);

            setTimeout(() => {
                notification.open({
                    icon: null,
                    message: "支持作者",
                    description: "如果喜欢这款插件，请考虑五星好评",
                    placement: "bottomLeft",
                    duration: 5,
                    closeIcon: false
                });
            }, 1000);

            // 额外提醒
            // if (currentVersion === "3.1.0") {
            //     setTimeout(() => {
            //         notification.open({
            //             icon: null,
            //             message: "重要通知",
            //             description: "本次更新修改了偏好设置中的切换间隔，如出现异常请点击重置设置按钮",
            //             placement: "bottomLeft",
            //             duration: 10,
            //             closeIcon: false
            //         });
            //     }, 2000);
            // }
        }

        // 修改弹窗主题
        let bodyEle = $("body");
        bodyEle.bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-header, .ant-list-item").css("borderBlockEndColor", getFontColor(minorColor));
            $(".ant-list-header, .ant-list-item, .ant-list-footer").css("padding", "6px 0");
            $(".ant-list-item-meta-title").css("color", getFontColor(minorColor));
            $(".ant-list-item-meta-description").css("color", getFontColor(minorColor));
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css("color", getFontColor(minorColor)).addClass("poemFont");

            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-title").css({
                    "color": getFontColor(minorColor),
                    "font-size": "20px",
                }).addClass("poemFont");
                $(".ant-switch").find(".ant-switch-inner-checked").css("color", getFontColor(minorColor));
                $(".ant-form-item-extra").css("color", getFontColor(minorColor)).addClass("poemFont");

                let dailyNotificationStorage = localStorage.getItem("dailyNotification");
                if (dailyNotificationStorage) {
                    resetSwitchColor("#dailyNotificationSwitch", JSON.parse(dailyNotificationStorage), majorColor);
                }
                let todoNotificationStorage = localStorage.getItem("todoNotification");
                if (todoNotificationStorage) {
                    resetSwitchColor("#todoNotificationSwitch", JSON.parse(todoNotificationStorage), majorColor);
                }
                let focusMode = localStorage.getItem("focusMode");
                if (focusMode) {
                    resetSwitchColor("#focusModeSwitch", JSON.parse(focusMode), majorColor);
                }
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
                    "color": getFontColor(minorColor),
                }).addClass("poemFont");
                $(".ant-message-custom-content > .anticon").css("color", getFontColor(minorColor));
            }

            // notification
            let notificationEle = $(".ant-notification");
            if (notificationEle.length && notificationEle.length > 0) {
                $(".ant-notification-notice").css({"backgroundColor": minorColor});
                $(".ant-notification-notice-icon").css("color", getFontColor(minorColor));
                $(".ant-notification-notice-message").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-notification-notice-description").css("color", getFontColor(minorColor)).addClass("poemFont");
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-title").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-form-item-label > label").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-form-item-extra").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-radio-wrapper").children(":last-child").css("color", getFontColor(minorColor)).addClass("poemFont");
                $(".ant-switch").find(".ant-switch-inner-checked").css("color", getFontColor(minorColor));
                // $(".ant-select-selection-item").addClass("poemFont");

                // preferenceFunctionComponent
                resetRadioColor(preferenceData.searchEngine, ["bing", "google"], majorColor);
                resetRadioColor(preferenceData.buttonShape, ["round", "default"], majorColor);
                resetRadioColor(preferenceData.poemTopic, poemTopics, majorColor);
                resetRadioColor(preferenceData.fontFamily, ["cursive", "sansSerif"], majorColor);
                resetRadioColor(preferenceData.fontVariant, ["simplified", "traditional"], majorColor);
                resetSwitchColor("#autoTopicSwitch", preferenceData.autoTopic, majorColor);
                resetSwitchColor("#simpleModeSwitch", preferenceData.simpleMode, majorColor);
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
                if (preferenceData.buttonShape === "round") {
                    $(".ant-modal-footer > .ant-btn").addClass("poemFont ant-btn-round ant-btn-text").removeClass("ant-btn-default ant-btn-primary");
                } else {
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

            // 设置字体
            setFont(".poemFont", preferenceData);
        });

        // const observer = new MutationObserver((mutations) => {
        //     mutations.forEach((mutation) => {
        //         // 插入节点时
        //         if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        //
        //         }
        //     });
        // });
        // observer.observe(document.body, {childList: true});
    }, [majorColor, minorColor, preferenceData, preferenceData.autoTopic, preferenceData.buttonShape, preferenceData.poemTopic, preferenceData.searchEngine, preferenceData.simpleMode]);

    return (
        <Layout>
            <Header id={"header"}>
                <Row justify="center">
                    <Col xs={0} sm={0} md={0} lg={10} xl={10} xxl={10} className={"zIndexMiddle"}>
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
                                getHolidayData={getHolidayData}
                            />
                            <WeatherComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                        </Space>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={10} xl={10} xxl={10} style={{textAlign: "right"}}>
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
                            <FocusComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                preferenceData={preferenceData}
                            />
                            <MenuComponent
                                majorColor={majorColor}
                                minorColor={minorColor}
                                svgColors={svgColors}
                                preferenceData={preferenceData}
                                getPreferenceData={getPreferenceData}
                            />
                        </Space>
                    </Col>
                    <Col xs={22} sm={22} md={22} lg={0} xl={0} xxl={0} style={{textAlign: "right"}}>
                        <MenuComponent
                            majorColor={majorColor}
                            minorColor={minorColor}
                            svgColors={svgColors}
                            preferenceData={preferenceData}
                            getPreferenceData={getPreferenceData}
                        />
                    </Col>
                </Row>
                <SunComponent sunColors={svgColors}/>
            </Header>
            <Content id={"content"} className="alignCenter">
                <Row gutter={[0, 8]}>
                    <Col xs={0} sm={0} md={24} lg={24} xl={24} xxl={24}>
                        <ClockComponent
                            minorColor={minorColor}
                            holidayData={holidayData}
                        />
                    </Col>
                    <Col span={24}>
                        <PoemComponent
                            majorColor={majorColor}
                            minorColor={minorColor}
                            preferenceData={preferenceData}
                            getTheme={getTheme}
                        />
                    </Col>
                </Row>
            </Content>
            <Footer id={"footer"}>
                <WaveComponent waveColors={svgColors}/>
            </Footer>
        </Layout>
    );
}

export default App;
