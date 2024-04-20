import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Form,
    Input,
    List,
    message,
    Modal,
    Popover,
    Rate,
    Row,
    Select,
    Space,
    Switch,
    Typography
} from "antd";
import {CheckOutlined, CheckSquareOutlined, PlusOutlined, TagOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;

function TodoComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [todoList, setTodoList] = useState<any[]>([]);
    const [tag, setTag] = useState("工作");
    const [priority, setPriority] = useState("★");
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");
    const [notification, setNotification] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const todoMaxSize = 10;

    function finishAllBtnOnClick() {
        setTodoList([]);
        localStorage.removeItem("todos");
    }

    function notificationSwitchOnChange(checked: boolean) {
        setNotification(checked);
        localStorage.setItem("todoNotification", checked.toString());
    }

    function showAddModalBtnOnClick() {
        if (todoList.length < todoMaxSize) {
            setDisplayModal(true);
            setInputValue("");
            setTag("工作");
            setPriority("★");
        } else {
            message.error("待办数量最多为" + todoMaxSize + "个");
        }
    }

    function inputOnChange(e: any) {
        setInputValue(e.target.value);
    }

    function modalOkBtnOnClick() {
        if (inputValue && inputValue.length > 0) {
            let tempTodoList = todoList;
            tempTodoList.push({
                "title": inputValue,
                "tag": tag,
                "priority": priority,
                "timeStamp": Date.now()
            });

            tempTodoList.sort((a: any, b: any) => {
                return b.priority.length - a.priority.length;
            });

            setDisplayModal(false);
            setTodoList(tempTodoList);
            localStorage.setItem("todos", JSON.stringify(tempTodoList));
            message.success("添加成功");
        } else {
            message.error("表单不能为空");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false)
    }

    function finishBtnOnClick(item: any) {
        let tempTodoList = todoList.concat();  // 深拷贝，不然删除后视图无法更新
        let index = -1;
        for (let i = 0; i < tempTodoList.length; i++) {
            if (item.timeStamp === tempTodoList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempTodoList.splice(index, 1);
        }

        tempTodoList.sort((a: any, b: any) => {
            return b.priority.length - a.priority.length;
        });

        setTodoList(tempTodoList);
        localStorage.setItem("todos", JSON.stringify(tempTodoList));
    }

    function selectOnChange(value: string) {
        let tempTag;
        switch (value) {
            case "work":
                tempTag = "工作";
                break;
            case "study":
                tempTag = "学习";
                break;
            case "life":
                tempTag = "生活";
                break;
            case "rest":
                tempTag = "休闲";
                break;
            case "other":
                tempTag = "其它";
                break;
            default:
                tempTag = "工作";
                break;
        }
        setTag(tempTag);
    }

    function rateOnChange(value: number) {
        setPriority("★".repeat(value));
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

        let tempNotification = false;
        let notificationStorage = localStorage.getItem("todoNotification");
        if (notificationStorage) {
            tempNotification = JSON.parse(notificationStorage);
        } else {
            localStorage.setItem("todoNotification", JSON.stringify(false));
        }

        let tempTodoListStorage = localStorage.getItem("todos");
        if (tempTodoListStorage) {
            setTodoList(JSON.parse(tempTodoListStorage));

            if (tempNotification) {
                message.warning("剩余 " + JSON.parse(tempTodoListStorage).length + " 个待办事项未处理");
            }
        }

        setNotification(tempNotification);
    }, [props.preferenceData.buttonShape, props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={8}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"待办事项 " + todoList.length + " / " + todoMaxSize}
                </Text>
            </Col>
            <Col span={16} style={{textAlign: "right"}}>
                <Space>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" id={"todoNotificationSwitch"} className={"poemFont"}
                            checked={notification} onChange={notificationSwitchOnChange}/>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={showAddModalBtnOnClick}>
                        {"添加待办事项"}
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CheckOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={finishAllBtnOnClick}>
                        {"全部完成"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List
            dataSource={todoList}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Button type={"text"} shape={buttonShape} icon={<CheckOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                onClick={(event) => finishBtnOnClick(item)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor)}}/>
                    ]}
                >
                    <Row style={{width: "100%"}}>
                        <Col span={12}>
                            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CheckSquareOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {item.title}
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<TagOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {item.tag + " ｜ " + item.priority}
                            </Button>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );

    return (
        <Row>
            <Popover title={popoverTitle} content={popoverContent} placement="bottomRight"
                     color={props.minorColor}
                     overlayStyle={{width: "550px"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CheckSquareOutlined/>}
                        size={"large"}
                        id={"todoBtn"}
                        className={"componentTheme poemFont"}
                        style={{
                            cursor: "default",
                            display: display,
                            backgroundColor: props.minorColor,
                            color: getFontColor(props.minorColor)
                        }}
                >
                    {todoList.length + " 个"}
                </Button>
            </Popover>
            <Modal title={"添加待办事项 " + todoList.length + " / " + todoMaxSize} closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                    styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"待办事项"} name={"todoInput"}>
                        <Input className={"poemFont"} id={"todoInput"} placeholder="请输入待办内容"
                               value={inputValue} onChange={inputOnChange} maxLength={10} showCount allowClear/>
                    </Form.Item>
                    <Form.Item label={"标签分类"} name={"todoSelect"} initialValue={"work"}>
                        <Select
                            popupClassName={"poemFont"}
                            onChange={selectOnChange}
                            options={[
                                {value: "work", label: "工作"},
                                {value: "study", label: "学习"},
                                {value: "life", label: "生活"},
                                {value: 'rest', label: '休闲'},
                                {value: 'other', label: '其它'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label={"优先级别"} name={"todoRate"} initialValue={1}>
                        <Rate onChange={rateOnChange} style={{
                            color: props.majorColor,
                            stroke: getFontColor(props.minorColor),
                            strokeWidth: "25px"
                        }}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    );
}

export default TodoComponent;