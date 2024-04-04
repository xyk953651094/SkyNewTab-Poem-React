/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Input,
    List,
    message,
    Popover,
    Row,
    Space,
    Switch,
    Typography,
    Modal,
    Form,
    Select,
    Avatar
} from 'antd';
import {btnMouseOut, btnMouseOver, getBrowserType, getFontColor, getTimeDetails} from "../typescripts/publicFunctions";
import {DeleteOutlined, LinkOutlined, PlusOutlined, CaretRightOutlined, PauseOutlined} from "@ant-design/icons";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const focusAudio = new Audio();
const {Text} = Typography;

function FocusComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [filterList, setFilterList] = useState<any[]>([]);
    const [focusPeriod, setFocusPeriod] = useState("manual");
    const [focusEndTime, setFocusEndTime] = useState("未开启专注模式");
    const [focusSound, setFocusSound] = useState("古镇雨滴");
    const [focusSoundIconUrl, setFocusSoundIconUrl] = useState("https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png");
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
        let tempFocusEndTime: string;
        let tempFocusEndTimeStamp: number;
        if (checked) {
            if (focusPeriod === "manual") {
                tempFocusEndTime = "手动结束";
                tempFocusEndTimeStamp = 0;
            } else {
                tempFocusEndTimeStamp = Date.now() + Number(focusPeriod);
                tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            tempFocusEndTime = "未开启专注模式";
            tempFocusEndTimeStamp = -1;
        }

        setFocusMode(checked);
        setFocusEndTime(tempFocusEndTime);
        localStorage.setItem("focusMode", JSON.stringify(checked));
        localStorage.setItem("focusPeriod", JSON.stringify(focusPeriod));
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(tempFocusEndTimeStamp));
        setExtensionStorage("focusMode", checked);
        setExtensionStorage("focusEndTimeStamp", tempFocusEndTimeStamp);

        autoStopFocus(checked, tempFocusEndTimeStamp);

        // 关闭时停止播放白噪音
        if (!checked && !focusAudio.paused) {
            setFocusAudioPaused(true);
            focusAudio.pause();
        }
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

    function focusTimeSelectOnChange(value: string) {
        setFocusPeriod(value);
    }

    function focusSoundSelectOnChange(value: string) {
        switch (value) {
            case "古镇雨滴": {
                setFocusSoundIconUrl("https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png");
                break;
            }
            case "松树林小雪": {
                setFocusSoundIconUrl("https://www.soundvery.com/KUpload/image/20240125/20240125190604_0946.png");
                break;
            }
            default: {
                setFocusSoundIconUrl("https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png");
            }
        }
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
                focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
                break;
            }
            case "松树林小雪": {
                focusAudio.src = "https://www.soundvery.com/KUpload/file/20240125/20240125190612_0979.mp3";
                break;
            }
            default: {
                focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
            }
        }
        focusAudio.loop = true;
        focusAudio.play();
    }

    // 倒计时自动关闭专注模式
    function autoStopFocus(focusMode: boolean, focusEndTimeStamp: number) {
        if (focusMode && focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp) {
            let interval = setInterval(() => {
                if (Date.now() >= focusEndTimeStamp) {
                    setFocusMode(false);
                    setFocusPeriod("manual");
                    setFocusEndTime("未开启专注模式");
                    resetFocusModeStorage();
                    message.info("已关闭专注模式");
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    function resetFocusModeStorage() {
        localStorage.setItem("focusMode", JSON.stringify(false));
        localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
        setExtensionStorage("focusMode", false);
        setExtensionStorage("focusEndTimeStamp", -1);
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

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

        // 初始化专注时间
        let tempFocusPeriod = "manual";
        let focusPeriodStorage = localStorage.getItem("focusPeriod");
        if (focusPeriodStorage) {
            tempFocusPeriod = JSON.parse(focusPeriodStorage);
        } else {
            localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        }

        // 初始化专注截止时间
        let tempFocusEndTime = "未开启专注模式";
        let tempFocusEndTimeStamp = -1;
        let focusEndTimeStampStorage = localStorage.getItem("focusEndTimeStamp");
        if (focusEndTimeStampStorage) {
            tempFocusEndTimeStamp = JSON.parse(focusEndTimeStampStorage);

            if (tempFocusEndTimeStamp === -1) {
                tempFocusEndTime = "未开启专注模式";
            } else if (tempFocusEndTimeStamp === 0) {
                tempFocusEndTime = "手动结束";
            } else {
                tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
            setExtensionStorage("focusEndTimeStamp", -1);
        }

        // 极简模式下或者专注时段过去后初始化专注模式
        if (props.preferenceData.simpleMode || (tempFocusMode && tempFocusEndTimeStamp > 0 && Date.now() > tempFocusEndTimeStamp)) {
            tempFocusMode = false;
            tempFocusPeriod = "manual";
            tempFocusEndTime = "未开启专注模式";
            resetFocusModeStorage();
        }

        if (tempFocusMode) {
            message.info("已开启专注模式");
        }

        setFocusMode(tempFocusMode);
        setFilterList(tempFilterList);
        setFocusPeriod(tempFocusPeriod);
        setFocusEndTime(tempFocusEndTime);
        autoStopFocus(tempFocusMode, tempFocusEndTimeStamp);

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
                        {"添加黑名单"}
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
            header={
                <Space direction={"vertical"}>
                    <Space>
                        <Button type={"text"} shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-hourglass-split"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"自动结束"}
                        </Button>
                        <Select value={focusPeriod} className={"poemFont"} popupClassName={"poemFont"} style={{width: 120}} placement={"topLeft"}
                                onChange={focusTimeSelectOnChange}
                                disabled={focusMode}
                                options={[
                                    {value: "manual", label: "手动结束"},
                                    {value: "900000", label: "15 分钟后"},
                                    {value: "1800000", label: "30 分钟后"},
                                    {value: "2700000", label: "45 分钟后"},
                                    {value: "3600000", label: "60 分钟后"},
                                ]}
                        />
                        <Button type={"text"} shape={props.preferenceData.buttonShape}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"结束时间：" + focusEndTime}
                        </Button>
                    </Space>
                    <Space>
                        <Button type={"text"} shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-music-note-beamed"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"专注噪音"}
                        </Button>
                        <Select defaultValue={focusSound} className={"poemFont"} popupClassName={"poemFont"} style={{width: 120}}
                                onChange={focusSoundSelectOnChange}
                                options={[
                                    {value: "古镇雨滴", label: "古镇雨滴"},
                                    {value: "松树林小雪", label: "松树林小雪"}
                                ]}
                        />
                        <Button type={"text"} shape={props.preferenceData.buttonShape}
                                icon={focusAudioPaused ? <CaretRightOutlined /> : <PauseOutlined />}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                onClick={playBtnOnClick}
                                style={{color: getFontColor(props.minorColor)}}>
                            {focusAudioPaused ? "播放" : "暂停"}
                        </Button>
                        <Avatar size={"large"} src={focusSoundIconUrl} />
                    </Space>
                </Space>
            }
        />
    );

    return (
        <>
            <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                     color={props.minorColor}
                     overlayStyle={{width: "550px"}}>
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
            <Modal title={"添加黑名单 " + filterList.length + " / " + focusMaxSize}
                   closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"网站域名"} name={"focusInput"} extra={"开启专注模式后，访问黑名单中的域名时将自动跳转至本插件"}>
                        <Input className={"poemFont"} id={"focusInput"} placeholder="example.com"
                               value={inputValue} onChange={inputOnChange} maxLength={30} showCount allowClear/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default FocusComponent;