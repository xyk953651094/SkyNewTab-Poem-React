/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import React, {useEffect, useState} from "react";
import {Button, Col, Input, List, message, Popover, Row, Space, Switch, Typography, Modal, Form, Select} from 'antd';
import {btnMouseOut, btnMouseOver, getBrowserType, getFontColor} from "../typescripts/publicFunctions";
import {DeleteOutlined, LinkOutlined, PlusOutlined, PlayCircleOutlined, PauseCircleOutlined} from "@ant-design/icons";
import focusSoundOne from "../assets/focusSounds/古镇雨滴.mp3";
import focusSoundTwo from "../assets/focusSounds/松树林小雪.mp3";

const focusAudio = new Audio();
const focusSoundsDictionary = {
    "focusSoundOne": focusSoundOne,
    "focusSoundTwo": focusSoundTwo,
}
const {Text} = Typography;

function FocusComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [filterList, setFilterList] = useState<any[]>([]);
    const [focusSound, setFocusSound] = useState("古镇雨滴");
    const [focusAudioPaused, setFocusAudioPaused] = useState(true);
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const focusMaxSize = 10;
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
        setFilterList([]);
        localStorage.removeItem("filterList");
        setExtensionStorage("filterList", []);
    }

    function removeBtnOnClick(item: any) {
        let tempFilterList = filterList.concat();  // 深拷贝，不然删除后视图无法更新
        let index = -1;
        for (let i = 0; i < tempFilterList.length; i++) {
            if (item.timeStamp === tempFilterList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempFilterList.splice(index, 1);
        }

        setFilterList(tempFilterList);
        localStorage.setItem("filterList", JSON.stringify(tempFilterList));
        setExtensionStorage("filterList", tempFilterList);
    }

    function showAddModalBtnOnClick() {
        if (filterList.length < focusMaxSize) {
            setDisplayModal(true);
            setInputValue("");
        } else {
            message.error("域名数量最多为" + focusMaxSize + "个");
        }
    }

    function inputOnChange(e: any) {
        setInputValue(e.target.value);
    }

    function modalOkBtnOnClick() {
        if (inputValue.length > 0) {
            let tempFilterList = filterList;
            tempFilterList.push({
                "domain": inputValue,
                "timeStamp": Date.now()
            });

            setDisplayModal(false);
            setFilterList(tempFilterList);
            localStorage.setItem("filterList", JSON.stringify(filterList));
            setExtensionStorage("filterList", filterList);
            message.success("添加成功");
        } else {
            message.error("域名不能为空");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false);
    }

    function focusSoundSelectOnChange(value: string) {
        setFocusSound(value);
        setFocusAudioPaused(false);
        playFocusSound(value);
    }

    function playBtnOnClick() {
        if (focusAudio.paused) {
            setFocusAudioPaused(false);
            playFocusSound(focusSound);
        } else {
            setFocusAudioPaused(true);
            focusAudio.pause();
        }
    }

    function playFocusSound(focusSound: string) {
        switch (focusSound) {
            case "古镇雨滴": {
                focusAudio.src = focusSoundsDictionary.focusSoundOne;
                break;
            }
            case "松树林小雪": {
                focusAudio.src = focusSoundsDictionary.focusSoundTwo;
                break;
            }
            default: {
                focusAudio.src = focusSoundsDictionary.focusSoundOne;
            }
        }
        focusAudio.loop = true;
        focusAudio.play();
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

        // 初始化专注模式开启状态
        if (props.preferenceData.simpleMode) {
            setFocusMode(false);
            localStorage.setItem("focusMode", JSON.stringify(false));
            setExtensionStorage("focusMode", false);
        } else {
            let focusModeStorage = localStorage.getItem("focusMode");
            if (focusModeStorage) {
                setFocusMode(JSON.parse(focusModeStorage));
                if (JSON.parse(focusModeStorage) === true) {
                    message.info("已开启专注模式");
                }
            } else {
                localStorage.setItem("focusMode", JSON.stringify(false));
                setExtensionStorage("focusMode", false);
            }
        }

        // 初始化名单
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            setFilterList(JSON.parse(filterListStorage));
        } else {
            localStorage.setItem("filterList", JSON.stringify([]));
            setExtensionStorage("filterList", []);
        }
    }, [props.preferenceData.buttonShape, props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={8}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"专注模式 " + filterList.length + " / " + focusMaxSize}
                </Text>
            </Col>
            <Col span={16} style={{textAlign: "right"}}>
                <Space>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"focusModeSwitch"} className={"poemFont"}
                            checked={focusMode} onChange={focusModeSwitchOnChange}/>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={showAddModalBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}} >
                        {"添加域名"}
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={removeAllBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {"全部删除"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List
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
                <Space>
                    <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {focusAudioPaused ? "白噪音" : "播放中"}
                    </Text>
                    <Select defaultValue={focusSound} className={"poemFont"} style={{width: 120}} placement={"topLeft"}
                            onChange={focusSoundSelectOnChange}>
                        <Select.Option className={"poemFont"} value={"古镇雨滴"}>{"古镇雨滴"}</Select.Option>
                        <Select.Option className={"poemFont"} value={"松树林小雪"}>{"松树林小雪"}</Select.Option>
                    </Select>
                    <Button type={"text"} shape={props.preferenceData.buttonShape}
                            icon={focusAudioPaused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            onClick={playBtnOnClick}
                            style={{color: getFontColor(props.minorColor)}}>
                        {focusAudioPaused ? "播放" : "暂停"}
                    </Button>
                </Space>
            }
        />
    );

    return (
        <>
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
            <Modal title={"添加域名 " + filterList.length + " / " + focusMaxSize}
                   closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"网站域名"} name={"focusInput"} extra={"开启专注模式后，访问添加的域名时将自动跳转至本插件"}>
                        <Input className={"poemFont"} id={"focusInput"} placeholder="example.com"
                               value={inputValue} onChange={inputOnChange} maxLength={20} showCount allowClear/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default FocusComponent;