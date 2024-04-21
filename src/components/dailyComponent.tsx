import React, {useEffect, useState} from "react";
import {DatePickerProps, Select, Switch} from 'antd';
import dayjs from 'dayjs';
import {Button, Col, DatePicker, Form, Input, List, message, Modal, Popover, Row, Space, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor, getTimeDetails, isEmpty} from "../typescripts/publicFunctions";

const {Text} = Typography;

function DailyComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [dailyList, setDailyList] = useState<any[]>([]);
    const [selectedTimeStamp, setSelectedTimeStamp] = useState(0);
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const [notification, setNotification] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [dailySelectDisabled, setDailySelectDisabled] = useState(false);
    const [loop, setLoop] = useState("");
    const dailyMaxSize = 10;

    function removeAllBtnOnClick() {
        setDailyList([]);
        localStorage.removeItem("daily");
    }

    function removeBtnOnClick(item: any) {
        let tempDailyList = dailyList.concat();   // 深拷贝，不然删除后视图无法更新
        let index = -1;
        for (let i = 0; i < tempDailyList.length; i++) {
            if (item.timeStamp === tempDailyList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempDailyList.splice(index, 1);
        }

        tempDailyList.sort((a: any, b: any) => {
            return a.selectedTimeStamp - b.selectedTimeStamp;
        });

        setDailyList(tempDailyList);
        localStorage.setItem("daily", JSON.stringify(tempDailyList));
    }

    function notificationSwitchOnChange(checked: boolean) {
        setNotification(checked);
        localStorage.setItem("dailyNotification", JSON.stringify(checked));
    }

    function showAddModalBtnOnClick() {
        if (dailyList.length < dailyMaxSize) {
            setDisplayModal(true);
            setInputValue("");
            setSelectedTimeStamp(0);
            setLoop("");
        } else {
            message.error("倒数日数量最多为" + dailyMaxSize + "个");
        }
    }

    function inputOnChange(e: any) {
        setInputValue(e.target.value);
    }

    function modalOkBtnOnClick() {
        if (inputValue && inputValue.length > 0 && selectedTimeStamp !== 0) {
            let tempDailyList = dailyList;
            tempDailyList.push({
                "title": inputValue,
                "selectedTimeStamp": selectedTimeStamp,
                "loop": loop,
                "timeStamp": Date.now()
            });

            tempDailyList.sort((a: any, b: any) => {
                return a.selectedTimeStamp - b.selectedTimeStamp;
            });

            setDisplayModal(false);
            setDailyList(tempDailyList);
            localStorage.setItem("daily", JSON.stringify(tempDailyList));
            message.success("添加成功");
        } else {
            message.error("表单不能为空");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false);
    }

    function getDailyDescription(selectedTimeStamp: number) {
        let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
        let description;
        if (todayTimeStamp - selectedTimeStamp > 0) {
            description = "已过 " + ((todayTimeStamp - selectedTimeStamp) / 86400000) + " 天";
        } else if (todayTimeStamp - selectedTimeStamp === 0) {
            description = "就是今天";
        } else {
            description = "还剩 " + ((selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
        }
        return description;
    }

    const datePickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString && typeof dateString === "string") {
            setSelectedTimeStamp(new Date(dateString).getTime());
            setDailySelectDisabled([29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1);
            if ([29, 30, 31].indexOf(new Date(dateString).getDate()) !== -1) {
                setLoop("");
            }
        } else {
            setSelectedTimeStamp(0);
        }
    };

    function selectOnChange(value: string) {
        let tempLoop;
        switch (value) {
            case "noLoop":
                tempLoop = "";
                break;
            case "everyWeek":
                tempLoop = "每周";
                break;
            case "everyMonth":
                tempLoop = "每月";
                break;
            case "everyYear":
                tempLoop = "每年";
                break;
            default:
                tempLoop = "";
                break;
        }
        setLoop(tempLoop);
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

        let tempNotification = false;
        let notificationStorage = localStorage.getItem("dailyNotification");
        if (notificationStorage) {
            tempNotification = JSON.parse(notificationStorage);
        } else {
            localStorage.setItem("dailyNotification", JSON.stringify(false));
        }

        let tempDailyList = [];
        let dailyListStorage = localStorage.getItem("daily");
        if (dailyListStorage) {
            tempDailyList = JSON.parse(dailyListStorage);

            let tempDailyListModified = false;
            tempDailyList.map((value: any) => {
                let tempValue = value;
                let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();

                // 倒数日通知
                if (tempNotification && value.selectedTimeStamp === todayTimeStamp) {
                    message.info("今日" + value.title);
                }

                // 更新循环倒数日
                if (!isEmpty(value.loop) && value.selectedTimeStamp < todayTimeStamp) {
                    tempDailyListModified = true;
                    switch (value.loop) {
                        case "每周":
                            value.selectedTimeStamp += 604800000;
                            break;
                        case "每月": {
                            let loopYear: string | number = new Date(value.selectedTimeStamp).getFullYear();
                            let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                            let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                            let nextLoopYear: string | number = loopYear;
                            let nextLoopMonth: string | number = loopMonth + 1;
                            if (loopMonth === 12) {
                                nextLoopYear += 1;
                                nextLoopMonth = 1;
                            }

                            nextLoopYear = nextLoopYear.toString();
                            nextLoopMonth = nextLoopMonth < 10 ? ("0" + nextLoopMonth) : nextLoopMonth.toString();
                            loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                            let nextLoopString = nextLoopYear.toString() + "-" + nextLoopMonth.toString() + "-" + loopDate.toString();
                            value.selectedTimeStamp = new Date(nextLoopString).getTime();
                            break;
                        }
                        case "每年": {
                            let nextLoopYear: string | number = new Date(value.selectedTimeStamp).getFullYear() + 1;
                            let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                            let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                            nextLoopYear = nextLoopYear.toString();
                            loopMonth = loopMonth < 10 ? ("0" + loopMonth) : loopMonth.toString();
                            loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                            let nextLoopString = nextLoopYear.toString() + "-" + loopMonth.toString() + "-" + loopDate.toString();
                            value.selectedTimeStamp = new Date(nextLoopString).getTime();
                            break;
                        }
                    }
                }
                return tempValue;
            });

            if (tempDailyListModified) {
                tempDailyList.sort((a: any, b: any) => {
                    return a.selectedTimeStamp - b.selectedTimeStamp;
                });
                localStorage.setItem("daily", JSON.stringify(tempDailyList));
            }
        }

        setDailyList(tempDailyList);
        setNotification(tempNotification);
    }, [props.preferenceData.buttonShape, props.preferenceData.simpleMode])


    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={8}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"倒数日 " + dailyList.length + " / " + dailyMaxSize}
                </Text>
            </Col>
            <Col span={16} style={{textAlign: "right"}}>
                <Space>
                    <Switch checkedChildren="已提醒" unCheckedChildren="不提醒" id={"dailyNotificationSwitch"} className={"poemFont"}
                            checked={notification} onChange={notificationSwitchOnChange}/>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={showAddModalBtnOnClick}>
                        {"添加倒数日"}
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={removeAllBtnOnClick}>
                        {"全部删除"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List
            dataSource={dailyList}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Button type={"text"} shape={buttonShape} icon={<DeleteOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                onClick={(event) => removeBtnOnClick(item)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor)}}/>
                    ]}
                >
                    <Row style={{width: "100%"}}>
                        <Col span={10}>
                            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {item.title}
                            </Button>
                        </Col>
                        <Col span={14}>
                            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ClockCircleOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {
                                    getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " +
                                    getDailyDescription(item.selectedTimeStamp) +
                                    (isEmpty(item.loop) ? "" : " · " + item.loop)
                                }
                            </Button>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );

    return (
        <Row>
            <Popover title={popoverTitle} content={popoverContent} placement={"bottomRight"}
                     color={props.minorColor}
                     overlayStyle={{width: "600px"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CalendarOutlined/>} size={"large"}
                        id={"dailyBtn"}
                        className={"componentTheme poemFont"}
                        style={{
                            backgroundColor: props.minorColor,
                            color: getFontColor(props.minorColor),
                            cursor: "default",
                            display: display,
                        }}
                >
                    {dailyList.length + " 个"}
                </Button>
            </Popover>
            <Modal title={"添加倒数日 " + dailyList.length + " / " + dailyMaxSize} closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"倒数标题"} name={"dailyInput"}>
                        <Input className={"poemFont"} id={"dailyInput"} placeholder="请输入标题"
                               value={inputValue} onChange={inputOnChange} maxLength={10} showCount allowClear/>
                    </Form.Item>
                    <Form.Item label={"倒数日期"} name={"dailyDatePicker"}>
                        <DatePicker disabledDate={(current) => dayjs(current).isBefore(dayjs())}
                                    onChange={datePickerOnChange} allowClear={false}
                                    id={"dailyDatePicker"} className={"poemFont"} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item label={"循环周期"} name={"dailySelect"} initialValue={"noLoop"} extra={"倒数日期为29、30、31日时，循环周期不得选择每月、每年"}>
                        <Select className={"poemFont"} popupClassName={"poemFont"}
                                onChange={selectOnChange}
                                options={[
                                    {value: "noLoop", label: "不循环"},
                                    {value: "everyWeek", label: "每周"},
                                    {value: "everyMonth", label: "每月（29、30、31日不生效）", disabled: dailySelectDisabled},
                                    {value: "everyYear", label: "每年（29、30、31日不生效）", disabled: dailySelectDisabled},
                                ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    );

}

export default DailyComponent;