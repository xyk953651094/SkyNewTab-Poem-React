/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import React, {useEffect, useState} from "react";
import {Button, Col, Input, List, message, Popover, Row, Space, Switch, Typography, Modal, Form} from 'antd';
import {btnMouseOut, btnMouseOver, getBrowserType, getFontColor} from "../typescripts/publicFunctions";
import {DeleteOutlined, LinkOutlined, PlusOutlined} from "@ant-design/icons";

const {Text} = Typography;

function FocusComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [filterList, setFilterList] = useState<any[]>([]);
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const focusMaxSize = 5;
    const browserType = getBrowserType();

    function setExtensionStorage(key: string, value: any) {
        // if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
        //     chrome.storage.local.set({[key]: value});
        // }
        // else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
        //     browser.storage.local.set({[key]: value});
        // }
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
        if (filterList.length < focusMaxSize) {
            if (inputValue.length > 0) {
                let tempFilterList = filterList;
                tempFilterList.push({
                    "domain": inputValue,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("filterList", JSON.stringify(filterList));
                setExtensionStorage("filterList", filterList);

                setDisplayModal(false);
                setFilterList(tempFilterList);
                message.success("添加成功");
            }
            else {
                message.error("域名不能为空");
            }
        }
        else {
            message.error("域名数量最多为" + focusMaxSize + "个");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false);
    }

    useEffect(() => {
        // 初始化专注模式开启状态
        let tempFocusMode = false;
        let focusModeStorage = localStorage.getItem("focusMode");
        if (focusModeStorage) {
            tempFocusMode = JSON.parse(focusModeStorage);
        } else {
            localStorage.setItem("focusMode", JSON.stringify(false));
            setExtensionStorage("focusMode", false);
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
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"开启专注模式后，访问以上域名时将自动跳转至新标签页"}
                </Text>
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
            <Modal title={
                <Text style={{color: props.minorColor}}>
                    {"添加域名 " + filterList.length + " / " + focusMaxSize}
                </Text>
            }
                   closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"网站域名"} name={"focusInput"}>
                        <Input className={"poemFont"} id={"focusInput"} placeholder="example.com"
                               value={inputValue} onChange={inputOnChange} maxLength={20} showCount allowClear/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default FocusComponent;