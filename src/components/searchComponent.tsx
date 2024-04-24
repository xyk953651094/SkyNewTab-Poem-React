import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Divider,
    Input,
    Popover,
    Row,
    Typography,
    Space,
    List,
    message,
    Form,
    Modal
} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined, EditOutlined, PushpinOutlined, LinkOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor, getSearchEngineDetail} from "../typescripts/publicFunctions";

const {Text} = Typography;

function SearchComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [displayAddModal, setDisplayAddModal] = useState(false);
    const [displayEditModal, setDisplayEditModal] = useState(false);
    const [searchEngineName, setSearchEngineName] = useState("必应");
    const [searchEngineValue, setSearchEngineValue] = useState("bing");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [linkList, setLinkList] = useState<any[]>([]);
    const [linkNameInputValue, setLinkNameInputValue] = useState("");
    const [linkUrlInputValue, setLinkUrlInputValue] = useState("");
    const linkMaxSize = 5;

    function removeAllBtnOnClick() {
        setLinkList([]);
        localStorage.removeItem("linkList");
        message.success("删除成功");
    }

    function removeBtnOnClick(item: any) {
        let tempLinkList = linkList.concat();   // 深拷贝，不然删除后视图无法更新
        let index = -1;
        for (let i = 0; i < tempLinkList.length; i++) {
            if (item.timeStamp === tempLinkList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempLinkList.splice(index, 1);
        }

        setLinkList(tempLinkList);
        localStorage.setItem("linkList", JSON.stringify(tempLinkList));
        message.success("删除成功");
    }

    function linkBtnOnClick(item: any) {
        window.open(item.linkUrl, "_self");
    }

    function onPressEnter(e: any) {
        window.open(searchEngineUrl + e.target.value, "_self");
    }

    function changeSearchEngine() {
        const searchEngines = ["bing", "google"];
        let currentIndex = searchEngines.indexOf(searchEngineValue);
        let nextIndex = 0;
        if (currentIndex !== searchEngines.length - 1) {
            nextIndex = currentIndex + 1;
        }

        let searchEngineDetail = getSearchEngineDetail(searchEngines[nextIndex])
        setSearchEngineName(searchEngineDetail.searchEngineName);
        setSearchEngineValue(searchEngineDetail.searchEngineValue);
        setSearchEngineUrl(getSearchEngineDetail(searchEngines[nextIndex].toLowerCase()).searchEngineUrl)
    }

    function showAddModalBtnOnClick() {
        if (linkList.length < linkMaxSize) {
            setDisplayAddModal(true);
            setLinkNameInputValue("");
            setLinkUrlInputValue("");
        } else {
            message.error("链接数量最多为" + linkMaxSize + "个");
        }
    }
    
    function showEditModalBtnOnClick() {
        setDisplayEditModal(true);
    }

    function linkNameInputOnChange(e: any) {
        setLinkNameInputValue(e.target.value);
    }

    function linkUrlInputOnChange(e: any) {
        setLinkUrlInputValue(e.target.value);
    }

    function addModalOkBtnOnClick() {
        if (linkNameInputValue.length > 0 && linkUrlInputValue.length > 0) {
            let urlRegExp = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]", "g");
            if (urlRegExp.exec(linkUrlInputValue) !== null) {
                let tempLinkList = linkList;
                tempLinkList.push({
                    "linkName": linkNameInputValue,
                    "linkUrl": linkUrlInputValue,
                    "timeStamp": Date.now()
                });

                setDisplayAddModal(false);
                setLinkList(tempLinkList);
                localStorage.setItem("linkList", JSON.stringify(tempLinkList));
                message.success("添加成功");
            } else {
                message.error("链接地址格式错误");
            }
        } else {
            message.error("表单不能为空");
        }
    }

    function addModalCancelBtnOnClick() {
        setDisplayAddModal(false);
    }

    function editNameInputOnPressEnter(item: any, e: any) {
        if (e.target.value.length > 0) {
            let tempLinkList = linkList;

            let index = -1;
            for (let i = 0; i < tempLinkList.length; i++) {
                if (item.timeStamp === tempLinkList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempLinkList[index].linkName = e.target.value;

                localStorage.setItem("linkList", JSON.stringify(tempLinkList));
                setLinkList(tempLinkList);
                message.success("修改成功");
            } else {
                message.error("修改失败");
            }
        } else {
            message.warning("链接名称不能为空");
        }
    }

    function editUrlInputOnPressEnter(item: any, e: any) {
        if (e.target.value.length > 0) {
            let tempLinkList = linkList;

            let index = -1;
            for (let i = 0; i < tempLinkList.length; i++) {
                if (item.timeStamp === tempLinkList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempLinkList[index].linkUrl = e.target.value;

                localStorage.setItem("linkList", JSON.stringify(tempLinkList));
                setLinkList(tempLinkList);
                message.success("修改成功");
            } else {
                message.error("修改失败");
            }
        } else {
            message.warning("链接地址不能为空");
        }
    }

    function editModalOkBtnOnClick() {
        setDisplayEditModal(false);
    }

    function editModalCancelBtnOnClick() {
        setDisplayEditModal(false);
    }

    useEffect(() => {
        let searchEngineDetail = getSearchEngineDetail(props.preferenceData.searchEngine);
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setSearchEngineName(searchEngineDetail.searchEngineName);
        setSearchEngineValue(searchEngineDetail.searchEngineValue);
        setSearchEngineUrl(searchEngineDetail.searchEngineUrl);

        let linkListStorage = localStorage.getItem("linkList");
        if (linkListStorage) {
            setLinkList(JSON.parse(linkListStorage));
        }
    }, [props.preferenceData.buttonShape, props.preferenceData.searchEngine, props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={6}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"搜索栏"}</Text>
            </Col>
            <Col span={18} style={{textAlign: "right"}}>
                <Space>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<PlusOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={showAddModalBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}} >
                        {"添加链接"}
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<EditOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={showEditModalBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}} >
                        {"编辑链接"}
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
        <List split={false}>
            <List.Item>
                <Input
                    id={"searchInput"}
                    className={"poemFont"}
                    prefix={
                        <Row align={"middle"}>
                            <Button type={"text"} size={"small"} shape={props.preferenceData.buttonShape}
                                    icon={<i className={"bi bi-" + searchEngineValue}></i>} onClick={changeSearchEngine}
                                    className={"poemFont"}
                                    style={{
                                        backgroundColor: props.minorColor,
                                        color: getFontColor(props.minorColor)
                                    }}>
                                {searchEngineName}
                            </Button>
                            <Divider type="vertical" style={{borderColor: props.minorColor}}/>
                        </Row>
                    }
                    suffix={<SearchOutlined/>}
                    placeholder={"按下 Enter 键搜索"}
                    onPressEnter={onPressEnter}
                    allowClear
                    style={{borderRadius: props.preferenceData.buttonShape === "round" ? "20px" : ""}}
                />
            </List.Item>
            <List.Item>
                <Space>
                    {
                        linkList.map((item: any) => {
                            return (
                                <Button type={"text"} shape={props.preferenceData.buttonShape} className={"poemFont"}
                                        onClick={(event) => linkBtnOnClick(item)}
                                        key={item.timeStamp}
                                        style={{color: getFontColor(props.majorColor), backgroundColor: props.majorColor}}>
                                    {item.linkName}
                                </Button>
                            )
                        })
                    }
                </Space>
            </List.Item>
        </List>
    );

    return (
        <>
            <Popover title={popoverTitle} content={popoverContent} placement={"bottomLeft"}
                     color={props.minorColor} overlayStyle={{width: "600px"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                        icon={<SearchOutlined style={{fontSize: "16px"}}/>} size={"large"}
                        className={"componentTheme poemFont"}
                        style={{
                            cursor: "default",
                            display: display,
                            backgroundColor: props.minorColor,
                            color: getFontColor(props.minorColor)
                        }}
                />
            </Popover>
            <Modal title={"添加链接 " + linkList.length + " / " + linkMaxSize} closeIcon={false}
                   centered
                   open={displayAddModal} onOk={addModalOkBtnOnClick}
                   onCancel={addModalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Form>
                    <Form.Item label={"链接名称"} name={"linkNameInput"}>
                        <Input className={"poemFont"} id={"linkNameInput"} placeholder="请输入链接名称"
                               value={linkNameInputValue} onChange={linkNameInputOnChange} maxLength={5} showCount allowClear/>
                    </Form.Item>
                    <Form.Item label={"链接地址"} name={"linkUrlInput"}>
                        <Input className={"poemFont"} id={"linkUrlInput"} placeholder="请输入链接地址"
                               value={linkUrlInputValue} onChange={linkUrlInputOnChange} allowClear/>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title={
                <Row align={"middle"}>
                    <Col span={12}>
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"编辑链接 " + linkList.length + " / " + linkMaxSize}
                        </Text>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<DeleteOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                onClick={removeAllBtnOnClick}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"全部删除"}
                        </Button>
                    </Col>
                </Row>
            }
                   closeIcon={false} centered
                   open={displayEditModal} onOk={editModalOkBtnOnClick}
                   onCancel={editModalCancelBtnOnClick}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <List
                    dataSource={linkList}
                    renderItem={(item: any) => (
                        <List.Item actions={[
                            <Button type={"text"} shape={props.preferenceData.buttonShape === "round" ? "circle" : "default"} icon={<DeleteOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={() => removeBtnOnClick(item)}
                                    className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            </Button>
                        ]}>
                            <Space>
                                <Input className={"poemFont"} id={"editNameInput"} style={{width: "150px"}} defaultValue={item.linkName} onPressEnter={(e) => editNameInputOnPressEnter(item, e)} maxLength={5} allowClear showCount/>
                                <Input className={"poemFont"} id={"editUrlInput"} style={{width: "250px"}} defaultValue={item.linkUrl} onPressEnter={(e) => editUrlInputOnPressEnter(item, e)} allowClear/>
                            </Space>
                        </List.Item>
                    )}
                    footer={
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"在输入框中修改内容后按回车生效"}
                        </Text>
                    }
                />
            </Modal>
        </>
    );

}

export default SearchComponent;