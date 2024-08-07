import React, {useEffect, useState} from 'react';
import {Button, Col, message, Row, Space, Typography, Tooltip, Form, Input, Modal} from "antd";
import "../stylesheets/publicStyles.scss";
import "../stylesheets/poemComponent.scss"
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getSearchEngineDetail,
    httpRequest, setTheme
} from "../typescripts/publicFunctions";
import {EditOutlined} from "@ant-design/icons";

const poemRequest = require('jinrishici');
const {Text} = Typography;
const poemMaxSize = 30;

function PoemComponent(props: any) {
    const [displayModal, setDisplayModal] = useState(false);
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时。");
    const [poemAuthor, setPoemAuthor] = useState("【张九龄】《望月怀远》");
    const [customPoem, setCustomPoem] = useState(false);
    const [customContentInputValue, setCustomContentInputValue] = useState("");
    const [customAuthorInputValue, setCustomAuthorInputValue] = useState("");

    function poemBtnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
        e.currentTarget.classList.remove("poemText");
        e.currentTarget.classList.add("componentTheme");
    }

    function poemBtnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
        e.currentTarget.classList.remove("componentTheme");
        e.currentTarget.classList.add("poemText");
    }

    function poemContentBtnOnClick() {
        window.open(searchEngineUrl + poemContent, "_self");
    }

    function showAddModalBtnOnClick() {
        setDisplayModal(true);
    }

    function customContentInputOnChange(e: any) {
        setCustomContentInputValue(e.target.value);
    }

    function customAuthorInputOnChange(e: any) {
        setCustomAuthorInputValue(e.target.value);
    }

    function modalOkBtnOnClick() {
        if (customContentInputValue.length > 0 && customAuthorInputValue.length > 0) {
            setDisplayModal(false);

            setCustomPoem(true);
            setPoemContent(customContentInputValue);
            setPoemAuthor(customAuthorInputValue);
            localStorage.setItem("customPoem", JSON.stringify(true));
            localStorage.setItem("customContent", customContentInputValue);
            localStorage.setItem("customAuthor", customAuthorInputValue);
            message.success("已使用自定诗词，一秒后刷新页面");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            message.error("表单不能为空");
        }
    }

    function modalCancelBtnOnClick() {
        setDisplayModal(false);
    }

    function disableCustomPoemBtnOnClick() {
        setDisplayModal(false);
        setCustomPoem(false);
        localStorage.setItem("customPoem", JSON.stringify(false));
        localStorage.removeItem("customContent");
        localStorage.removeItem("customAuthor");

        message.success("已关闭自定诗词，一秒后刷新页面");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    function setPoem(poemData: any) {
        let tempPoemContent = "";
        let tempPoemAuthor = "";

        if (props.preferenceData.autoTopic) {
            tempPoemContent = poemData.data.content.length < poemMaxSize ?
                poemData.data.content : poemData.data.content.substring(0, poemMaxSize) + "...";

            tempPoemAuthor =
                "【" + poemData.data.origin.dynasty + " · " + poemData.data.origin.author + "】" +
                "《" + poemData.data.origin.title + "》";
            tempPoemAuthor = tempPoemAuthor.length < poemMaxSize ?
                tempPoemAuthor : tempPoemAuthor.substring(0, poemMaxSize) + "...";
        } else {
            tempPoemContent = poemData.content.length < poemMaxSize ?
                poemData.content : poemData.content.substring(0, poemMaxSize) + "...";

            tempPoemAuthor = "【" + poemData.author + "】《" + poemData.origin + "》";
            tempPoemAuthor = tempPoemAuthor.length < poemMaxSize ?
                tempPoemAuthor : tempPoemAuthor.substring(0, poemMaxSize) + "...";
        }

        setPoemContent(tempPoemContent);
        setPoemAuthor(tempPoemAuthor);
    }

    function getPoem() {
        if (props.preferenceData.autoTopic) {
            poemRequest.load((result: any) => {
                localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                localStorage.setItem("lastPoem", JSON.stringify(result));                   // 保存请求结果，防抖节流

                // 设置颜色主题
                const theme = setTheme();
                props.getTheme(theme);

                setPoem(result);
            }, (errorData: any) => {
                // 请求失败时使用上一次请求结果
                let lastPoem: any = localStorage.getItem("lastPoem");
                if (lastPoem) {
                    lastPoem = JSON.parse(lastPoem);
                    setPoem(lastPoem);
                } else {
                    message.error("获取诗词失败");
                }
            });
        } else {
            let headers = {};
            let url = "https://v1.jinrishici.com/" + props.preferenceData.poemTopic;
            let data = {};
            httpRequest(headers, url, data, "GET")
                .then(function (resultData: any) {
                    localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                    localStorage.setItem("lastPoem", JSON.stringify(resultData));               // 保存请求结果，防抖节流

                    // 设置颜色主题
                    const theme = setTheme();
                    props.getTheme(theme);

                    setPoem(resultData);
                })
                .catch(function () {
                    // 请求失败时使用上一次请求结果
                    let lastPoem: any = localStorage.getItem("lastPoem");
                    if (lastPoem) {
                        lastPoem = JSON.parse(lastPoem);
                        setPoem(lastPoem);
                    } else {
                        message.error("获取诗词失败");
                    }
                });
        }
    }

    useEffect(() => {
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);

        let tempCustomPoem = false;
        let customPoemStorage = localStorage.getItem("customPoem");
        if (customPoemStorage) {
            tempCustomPoem = JSON.parse(customPoemStorage);
            setCustomPoem(tempCustomPoem);
        } else {
            localStorage.setItem("customPoem", JSON.stringify(false));
        }

        if (tempCustomPoem) {
            let customContentStorage = localStorage.getItem("customContent");
            let customAuthorStorage = localStorage.getItem("customAuthor");
            if (customContentStorage && customAuthorStorage) {
                setPoemContent(customContentStorage);
                setPoemAuthor(customAuthorStorage);
                setCustomContentInputValue(customContentStorage);
                setCustomAuthorInputValue(customAuthorStorage);
            }
        } else {
            // 防抖节流
            let lastPoemRequestTime: any = localStorage.getItem("lastPoemRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastPoemRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                getPoem();
            } else if (nowTimeStamp - parseInt(lastPoemRequestTime) > parseInt(props.preferenceData.changePoemTime)) {  // 必须多于切换间隔分钟才能进行新的请求
                getPoem();
            } else {  // 切换间隔之内使用上一次请求结果
                let lastPoem: any = localStorage.getItem("lastPoem");
                if (lastPoem) {
                    lastPoem = JSON.parse(lastPoem);
                    setPoem(lastPoem);
                } else {
                    message.error("获取诗词失败");
                }
            }
        }
    }, [props.preferenceData.searchEngine]);

    return (
        <>
            <Row justify="center" align="middle">
                <Space direction={"vertical"}>
                    <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                        <Button type="text" shape={props.preferenceData.buttonShape} size={"large"}
                                className="poemText poemFont largeFont"
                                style={{color: props.minorColor}}
                                onClick={poemContentBtnOnClick} onMouseOver={poemBtnMouseOver} onMouseOut={poemBtnMouseOut}>
                            {poemContent}
                        </Button>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                        <Tooltip title={customPoem ? "正在显示自定诗词" : "点击启用自定诗词"} placement={"bottom"} color={props.minorColor}>
                            <Button type="text" shape={props.preferenceData.buttonShape} size={"large"}
                                    className="poemText poemFont largeFont"
                                    style={{color: props.minorColor}}
                                    onClick={showAddModalBtnOnClick} onMouseOver={poemBtnMouseOver} onMouseOut={poemBtnMouseOut}>
                                {poemAuthor}
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                        <div className="alignCenter">
                            <Text className="poemText poemFont largeFont vertical" style={{color: props.minorColor}}>
                                {poemContent.length < 20 ? poemContent : poemContent.substring(0, 20) + "..."}
                            </Text>
                        </div>
                    </Col>
                </Space>
            </Row>
            <Modal title={
                <Row align={"middle"}>
                    <Col span={12}>
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"自定诗词"}
                        </Text>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <EditOutlined />
                    </Col>
                </Row>
            }
                   closeIcon={false}
                   centered
                   open={displayModal}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                   footer={[
                       <Button type={"text"} shape={props.preferenceData.buttonShape} key={"closeCustomPoem"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={disableCustomPoemBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor), display: customPoem ? "inline-block" : "none"}} >
                           {"关闭自定诗词"}
                       </Button>,
                       <Button type={"text"} shape={props.preferenceData.buttonShape} key={"modalCancel"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={modalCancelBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor)}} >
                           {"取消"}
                       </Button>,
                       <Button type={"text"} shape={props.preferenceData.buttonShape} key={"modalOk"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={modalOkBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor)}} >
                           {"确定"}
                       </Button>
                   ]}
            >
                <Form>
                    <Form.Item label={"诗词内容"} name={"customContentInput"}>
                        <Input className={"poemFont"} id={"customContentInput"} placeholder="请输入诗词内容"
                               value={customContentInputValue} defaultValue={customContentInputValue} onChange={customContentInputOnChange} maxLength={30} showCount allowClear/>
                    </Form.Item>
                    <Form.Item label={"作者信息"} name={"customAuthorInput"}>
                        <Input className={"poemFont"} id={"customAuthorInput"} placeholder="请输入作者信息"
                               value={customAuthorInputValue} defaultValue={customAuthorInputValue} onChange={customAuthorInputOnChange} maxLength={30} showCount allowClear/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default PoemComponent;