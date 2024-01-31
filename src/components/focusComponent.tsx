/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import React, {useEffect, useState} from "react";
import {Button, Col, Input, List, message, notification, Popover, Row, Space, Switch, Typography} from 'antd';
import {btnMouseOut, btnMouseOver, getBrowserType, getFontColor} from "../typescripts/publicFunctions";
import {DeleteOutlined, LinkOutlined, PlusOutlined, SyncOutlined} from "@ant-design/icons";

const {Text} = Typography;

function FocusComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [focusFilter, setFocusFilter] = useState("blackListFilter"); // whiteListFilter, blackListFilter
    const [inputValue, setInputValue] = useState("");
    const [filterList, setFilterList] = useState<any[]>([]);
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const focusMaxSize = 5;
    const browserType = getBrowserType();

    function setExtensionStorage(key: string, value: any) {
        if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        }
        else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            browser.storage.local.set({[key]: value});
        }
    }

    function focusModeSwitchOnChange(checked: boolean) {
        setFocusMode(checked);
        localStorage.setItem("focusMode", JSON.stringify(checked));
        setExtensionStorage("focusMode", checked);
    }

    function removeAllBtnOnClick() {
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            setFilterList([]);
            localStorage.removeItem("filterList");
            setExtensionStorage("filterList", []);
        }
    }

    function switchFilterBtnOnClick() {
        if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            message.error("暂不支持白名单模式");
        }
        else {
            let tempFocusFilter = (focusFilter === "whiteListFilter" ? "blackListFilter" : "whiteListFilter");
            setFocusFilter(tempFocusFilter);
            localStorage.setItem("focusFilter", tempFocusFilter);
            setExtensionStorage("focusFilter", tempFocusFilter);
        }
    }

    function inputOnChange(e: any) {
        setInputValue(e.target.value);
    }

    function addFilterListBtnOnClick() {
        if (filterList.length < focusMaxSize) {
            if (inputValue.length > 0) {
                let tempFilterList = filterList;
                tempFilterList.push({
                    "domain": inputValue,
                    "timeStamp": Date.now()
                });

                setInputValue("");
                setFilterList(tempFilterList);
                localStorage.setItem("filterList", JSON.stringify(filterList));
                setExtensionStorage("filterList", filterList);
            }
            else {
                message.error("域名不能为空");
            }
        }
        else {
            message.error("名单数量最多为" + focusMaxSize + "个");
        }
    }

    function removeBtnOnClick(item: any) {
        let filterList = [];
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            filterList = JSON.parse(tempFilterList);
            let index = -1;
            for (let i = 0; i < filterList.length; i++) {
                if (item.timeStamp === filterList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                filterList.splice(index, 1);
            }
            localStorage.setItem("filterList", JSON.stringify(filterList));
            setExtensionStorage("filterList", filterList);

            setFilterList(filterList);
        }
    }

    useEffect(() => {
        // 初始化专注模式开启状态
        let tempFocusMode = false;
        let focusModeStorage = localStorage.getItem("focusMode");
        if (focusModeStorage) {
            tempFocusMode = JSON.parse(focusModeStorage);
            if (tempFocusMode) {
                notification.open({
                    icon: null,
                    message: "已开启专注模式",
                    description: "部分网页将无法访问，右上角专注中可修改设置",
                    placement: "bottomLeft",
                    duration: 5,
                    closeIcon: false
                });
            }
        } else {
            localStorage.setItem("focusMode", JSON.stringify(false));
            setExtensionStorage("focusMode", false);
        }

        // 初始化过滤模式
        let tempFocusFilter = "blackListFilter";
        let focusFilterStorage = localStorage.getItem("focusFilter");
        if (focusFilterStorage) {
            tempFocusFilter = focusFilterStorage;
            if (tempFocusFilter === "whiteListFilter" && (["Firefox", "Safari"].indexOf(browserType) !== -1)) {
                message.info("暂不支持白名单模式，请切换成黑名单模式");
            }
        } else {
            localStorage.setItem("focusFilter", "blackListFilter");
            setExtensionStorage("focusFilter", "blackListFilter");
        }

        // 初始化名单
        let tempFilterList = [];
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            tempFilterList = JSON.parse(filterListStorage);
        } else {
            localStorage.setItem("filterList", JSON.stringify([]));
            setExtensionStorage("filterList", []);
        }

        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");
        setFocusMode(tempFocusMode);
        setFocusFilter(tempFocusFilter);
        setFilterList(tempFilterList);

        if (props.preferenceData.simpleMode) {
            setFocusMode(false);
            localStorage.setItem("focusMode", JSON.stringify(false));
            setExtensionStorage("focusMode", false);
        }
    }, [props.preferenceData.buttonShape, props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={8}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"专注模式"}</Text>
            </Col>
            <Col span={16} style={{textAlign: "right"}}>
                <Space>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"focusModeSwitch"} className={"poemFont"}
                            checked={focusMode} onChange={focusModeSwitchOnChange}/>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={removeAllBtnOnClick}>
                        {"全部清空"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List
            header={
                <Row align={"middle"}>
                    <Col span={8}>
                        <Space>
                            <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                                {(focusFilter === "whiteListFilter" ? "白名单 " : "黑名单 ") + filterList.length + " / " + focusMaxSize}
                            </Text>
                            <Button type={"text"} shape={buttonShape} icon={<SyncOutlined />}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={switchFilterBtnOnClick}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor)}}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span={16} style={{textAlign: "right"}}>
                        <Space>
                            <Input className={"poemFont"} id={"focusInput"} placeholder="example.com"
                                   value={inputValue} onChange={inputOnChange} maxLength={20} showCount allowClear/>
                            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={addFilterListBtnOnClick}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor)}}>
                                {"添加"}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            }
            dataSource={filterList}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Button type={"text"} shape={buttonShape}
                                icon={<DeleteOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                onClick={() => removeBtnOnClick(item)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor)}}/>
                    ]}
                >
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={<LinkOutlined />}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {item.domain}
                    </Button>
                </List.Item>
            )}
            footer={
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {
                        focusFilter === "whiteListFilter" ?
                            "白名单模式下，访问白名单外的网站将自动跳转至新标签页或空白页" :
                            "黑名单模式下，访问黑名单中的网站将自动跳转至新标签页或空白页"
                    }
                </Text>
            }
        />
    );

    return (
        <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                 color={props.minorColor}
                 overlayStyle={{width: "500px"}}>
            <Button shape={props.preferenceData.buttonShape} size={"large"}
                    icon={<i className={focusMode ? "bi bi-cup-hot-fill" : "bi bi-cup-hot"}></i>}
                    id={"focusBtn"}
                    className={"componentTheme poemFont"}
                    style={{
                        backgroundColor: props.minorColor,
                        color: getFontColor(props.minorColor),
                        cursor: "default",
                        display: display,
                    }}
            >
                {focusMode ? "专注中" : "未专注"}
            </Button>
        </Popover>
    );

}

export default FocusComponent;