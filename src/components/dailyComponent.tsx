import React, {useEffect, useState} from "react";
import {DatePickerProps} from 'antd';
import {Button, Col, DatePicker, Form, Input, List, message, Modal, Popover, Row, Space, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor, getTimeDetails} from "../typescripts/publicFunctions";


const {Text} = Typography;

function DailyComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [dailySize, setDailySize] = useState(0);
    const [dailyMaxSize, setDailyMaxSize] = useState(5);
    const [selectedTimeStamp, setSelectedTimeStamp] = useState(0);
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const [inputValue, setInputValue] = useState("");

    function removeAllBtnOnClick() {
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            localStorage.removeItem("daily");
            setListItems([]);
            setDailySize(0);
        }
    }

    function removeBtnOnClick(item: any) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
            let index = -1;
            for (let i = 0; i < daily.length; i++) {
                if (item.timeStamp === daily[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                daily.splice(index, 1);
            }
            localStorage.setItem("daily", JSON.stringify(daily));

            setListItems(daily);
            setDailySize(daily.length);
        }
    }

    function showAddModalBtnOnClick() {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        if (daily.length < dailyMaxSize) {
            setDisplayModal(true);
            setInputValue("");
            setSelectedTimeStamp(0);
        } else {
            message.error("倒数日数量最多为" + dailyMaxSize + "个");
        }
    }

    function inputOnChange(e: any) {
        setInputValue(e.target.value);
    }

    function modalOkBtnOnClick() {
        if (inputValue && inputValue.length > 0 && selectedTimeStamp !== 0) {
            let daily = [];
            let tempDaily = localStorage.getItem("daily");
            if (tempDaily) {
                daily = JSON.parse(tempDaily);
            }
            if (daily.length < dailyMaxSize) {
                daily.push({
                    "title": inputValue,
                    "selectedTimeStamp": selectedTimeStamp,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("daily", JSON.stringify(daily));

                setDisplayModal(false);
                setListItems(daily);
                setDailySize(daily.length);
                message.success("添加成功");
            } else {
                message.error("倒数日数量最多为" + dailyMaxSize + "个");
            }
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
        if (dateString) {
            setSelectedTimeStamp(new Date(dateString).getTime());
        } else {
            setSelectedTimeStamp(0);
        }
    };

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        setListItems(daily);
        setDailySize(daily.length);
    }, [props.preferenceData.buttonShape, props.preferenceData.simpleMode])


    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={10}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"倒数日 " + dailySize + " / " + dailyMaxSize}
                </Text>
            </Col>
            <Col span={14} style={{textAlign: "right"}}>
                <Space>
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
            dataSource={listItems}
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
                                {getTimeDetails(new Date(item.selectedTimeStamp)).showDate4 + " ｜ " + getDailyDescription(item.selectedTimeStamp)}
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
                     overlayStyle={{width: "550px"}}>
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
                    {dailySize + " 个"}
                </Button>
            </Popover>
            <Modal title={"添加倒数日 " + dailySize + " / " + dailyMaxSize} closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
            >
                <Form>
                    <Form.Item label={"倒数标题"} name={"dailyInput"}>
                        <Input className={"poemFont"} id={"dailyInput"} placeholder="请输入标题"
                               value={inputValue} onChange={inputOnChange} maxLength={10} showCount allowClear/>
                    </Form.Item>
                    <Form.Item label={"倒数日期"} name={"dailyDatePicker"}>
                        <DatePicker className={"poemFont"} onChange={datePickerOnChange} id={"dailyDatePicker"}
                                    allowClear={false}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    );

}

export default DailyComponent;