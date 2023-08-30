import React, {useEffect, useState} from "react";
import type {RadioChangeEvent} from "antd";
import {Button, Card, Col, Drawer, Form, message, Radio, Row, Switch, Tooltip, Typography} from "antd";
import {DeleteOutlined, MoreOutlined, SettingOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {defaultPreferenceData, device} from "../typescripts/publicConstants";
import PreferenceLinkComponent from "../preferenceComponents/preferenceLinkComponent";
import PreferenceFooterComponent from "../preferenceComponents/preferenceFooterComponent";
import PreferenceEmailComponent from "../preferenceComponents/preferenceEmailComponent";

const {Text} = Typography;

function PreferenceComponent(props: any) {
    const [displayDrawer, setDisplayDrawer] = useState(false);
    const [drawerPosition, setDrawerPosition] = useState("right");
    const [preferenceData, setPreferenceData] = useState(defaultPreferenceData);

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
    }

    function showDrawerBtnOnClick() {
        setDisplayDrawer(true);
    }

    function drawerOnClose() {
        setDisplayDrawer(false);
    }

    // 搜索引擎
    function searchEngineRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData(preferenceData => {
            let newPreferenceData = modifyPreferenceData({searchEngine: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换搜索引擎");
    }

    // 简洁模式
    function simpleModeSwitchOnChange(checked: boolean) {
        setPreferenceData(preferenceData => {
            let newPreferenceData = modifyPreferenceData({simpleMode: checked});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        if (checked) {
            message.success("已开启简洁模式");
        } else {
            message.success("已关闭简洁模式");
        }
    }

    // 重置设置
    function clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容，1秒后刷新页面");
        refreshWindow();
    }

    function modifyPreferenceData(data: Object) {
        return Object.assign({}, preferenceData, data);
    }

    function refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    useEffect(() => {
        // 初始化偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        setPreferenceData(tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData))

        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            setDrawerPosition("bottom")
        }
    }, [])
    
    return (
        <>
            <Tooltip title={"菜单栏"} placement={"bottomRight"} color={props.minorColor}>
                <Button type={"text"} shape={"circle"} icon={<MoreOutlined/>} size={"large"}
                        onClick={showDrawerBtnOnClick}
                        id={"preferenceBtn"}
                        className={"componentTheme poemFont"}
                        style={{backgroundColor: props.minorColor, color: getFontColor(props.minorColor)}}
                />
            </Tooltip>
            <Drawer
                title={"菜单栏"}
                size={"default"}
                placement={"right"}
                onClose={drawerOnClose}
                open={displayDrawer}
                closeIcon={false}
                headerStyle={{color: props.minorColor, borderBottomColor: props.minorColor}}
                drawerStyle={{backgroundColor: props.majorColor}}
                // maskStyle={{backgroundColor: props.majorColor, opacity: 0.45}}
                maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                footer={
                    <PreferenceFooterComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}/>
                }
                footerStyle={{
                    backgroundColor: props.majorColor,
                    borderTopColor: props.minorColor,
                    textAlign: "center"
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card title={"功能设置"} size={"small"}
                              extra={<SettingOutlined style={{color: props.minorColor}}/>}
                              style={{border: "1px solid " + props.minorColor}}
                              headStyle={{
                                  backgroundColor: props.majorColor,
                                  color: props.minorColor,
                                  borderBottom: "2px solid " + props.minorColor,
                                  fontFamily: "Times New Roman, cursive, sans-serif"
                              }}
                              bodyStyle={{backgroundColor: props.majorColor}}
                        >
                            <Form colon={false} initialValues={preferenceData}>
                                <Form.Item name={"searchEngine"} label={"搜索引擎"}>
                                    <Radio.Group buttonStyle={"solid"}
                                                 onChange={searchEngineRadioOnChange}>
                                        <Row>
                                            <Col span={12}><Radio value={"baidu"}>Baidu</Radio></Col>
                                            <Col span={12}><Radio value={"bing"}>Bing</Radio></Col>
                                            <Col span={12}><Radio value={"google"}>Google</Radio></Col>
                                            <Col span={12}><Radio value={"yandex"}>Yandex</Radio></Col>
                                        </Row>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                                            onChange={simpleModeSwitchOnChange}/>
                                </Form.Item>
                                <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                                    <Button type={"text"} shape={"round"} icon={<DeleteOutlined/>}
                                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                            onClick={clearStorageBtnOnClick}
                                            className={"poemFont"}
                                            style={{color: props.minorColor}}>
                                        清空并重置所有内容
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <PreferenceEmailComponent
                            majorColor={props.majorColor}
                            minorColor={props.minorColor}/>
                    </Col>
                    <Col span={24}>
                        <PreferenceLinkComponent
                            majorColor={props.majorColor}
                            minorColor={props.minorColor}/>
                    </Col>
                </Row>
            </Drawer>
        </>
    );
}

export default PreferenceComponent;