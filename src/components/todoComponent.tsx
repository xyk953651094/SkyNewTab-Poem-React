import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, List, message, Modal, Popover, Rate, Row, Select, Space, Typography} from "antd";
import {CheckOutlined, CheckSquareOutlined, PlusOutlined, TagOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";

const {Text} = Typography;
const $ = require("jquery");

function TodoComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayModal, setDisplayModal] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [todoSize, setTodoSize] = useState(0);
    const [todoMaxSize, setTodoMaxSize] = useState(5);
    const [tag, setTag] = useState("工作");
    const [priority, setPriority] = useState("★");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function finishAllBtnOnClick() {
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            localStorage.removeItem("todos");
            setListItems([]);
            setTodoSize(0);
        }
    }

    function showAddModalBtnOnClick() {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }
        if (todos.length < todoMaxSize) {
            // $("#todoInput").val("");
            setDisplayModal(true);
            setTag("工作");
            setPriority("★");
        } else {
            message.error("待办数量最多为" + todoMaxSize + "个");
        }
    }

    function modalOkBtnOnClick() {
        let todoContent = $("#todoInput").val();
        if (todoContent && todoContent.length > 0) {
            let todos = [];
            let tempTodos = localStorage.getItem("todos");
            if (tempTodos) {
                todos = JSON.parse(tempTodos);
            }
            if (todos.length < todoMaxSize) {
                todos.push({
                    "title": todoContent,
                    "tag": tag,
                    "priority": priority,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("todos", JSON.stringify(todos));
                setDisplayModal(false);
                setListItems(todos);
                setTodoSize(todos.length);
                message.success("添加成功");
            } else {
                message.error("待办数量最多为" + todoMaxSize + "个");
            }
        } else {
            message.error("表单不能为空");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false)
    }

    function finishBtnOnClick(item: any) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
            let index = -1;
            for (let i = 0; i < todos.length; i++) {
                if (item.timeStamp === todos[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                todos.splice(index, 1);
            }
            localStorage.setItem("todos", JSON.stringify(todos));

            setListItems(todos);
            setTodoSize(todos.length);
        }
    }

    function selectOnChange(value: string) {
        let tempTag = "工作";
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

        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }

        setListItems(todos);
        setTodoSize(todos.length);
    }, [props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={10}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"待办事项 " + todoSize + " / " + todoMaxSize}
                </Text>
            </Col>
            <Col span={14} style={{textAlign: "right"}}>
                <Space>
                    <Button type={"text"} shape={"round"} icon={<PlusOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}} onClick={showAddModalBtnOnClick}>
                        {"添加待办事项"}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<CheckOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
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
            dataSource={listItems}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Button type={"text"} shape={"circle"} icon={<CheckOutlined/>}
                                onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                onClick={(event) => finishBtnOnClick(item)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor)}}/>
                    ]}
                >
                    <Row style={{width: "100%"}}>
                        <Col span={12}>
                            <Button type={"text"} shape={"round"} icon={<CheckSquareOutlined/>}
                                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {item.title}
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type={"text"} shape={"round"} icon={<TagOutlined/>}
                                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                                {item.tag + "｜" + item.priority}
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
                <Button type={"text"} shape={"round"} icon={<CheckSquareOutlined/>} size={"large"}
                        id={"todoBtn"}
                        className={"componentTheme poemFont"}
                        style={{
                            cursor: "default",
                            display: display,
                            backgroundColor: props.minorColor,
                            color: getFontColor(props.minorColor)
                        }}
                >
                    {todoSize + " 个待办事项"}
                </Button>
            </Popover>
            <Modal title={"添加待办事项 " + todoSize + " / " + todoMaxSize} closeIcon={false}
                   centered
                   open={displayModal} onOk={modalOkBtnOnClick}
                   onCancel={modalCancelBtnOnClick}
                   destroyOnClose={true}
                   maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
            >
                <Form>
                    <Form.Item label={"待办事项"} name={"todoInput"}>
                        <Input placeholder="请输入待办内容" id="todoInput" maxLength={10} allowClear showCount/>
                    </Form.Item>
                    <Form.Item label={"标签分类"} name={"todoSelect"}>
                        <Select
                            popupClassName={"poemFont"}
                            defaultValue="work"
                            onChange={selectOnChange}
                            options={[
                                {value: 'work', label: '工作'},
                                {value: 'study', label: '学习'},
                                {value: 'life', label: '生活'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label={"优先级别"} name={"todoRate"}>
                        <Rate defaultValue={1} onChange={rateOnChange} style={{
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