import React, {useEffect, useState} from 'react';
import {Button, Col, message, Row, Space, Typography} from "antd";
import "../stylesheets/publicStyles.scss";
import "../stylesheets/poemComponent.scss"
import {getFontColor} from "../typescripts/publicFunctions";

const poemRequest = require('jinrishici');
const {Text} = Typography;
const poemMaxSize = 30;

function PoemComponent(props: any) {
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时。");
    const [poemAuthor, setPoemAuthor] = useState("张九龄");
    const [poemAuthorDetails, setPoemAuthorDetails] = useState("【唐】张九龄 ·《望月怀远》");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
        e.currentTarget.classList.remove("poemText");
        e.currentTarget.classList.add("componentTheme");
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
        e.currentTarget.classList.remove("componentTheme");
        e.currentTarget.classList.add("poemText");
    }

    function poemContentBtnOnClick() {
        window.open(searchEngineUrl + poemContent, "_blank");
    }

    function poemAuthorBtnOnClick() {
        window.open(searchEngineUrl + poemAuthor, "_blank");
    }

    function setPoem(poemData: any) {
        setPoemContent(poemData.data.content);
        setPoemAuthor(poemData.data.origin.author);
        setPoemAuthorDetails("【" + poemData.data.origin.dynasty + "】" +
            poemData.data.origin.author + " ·" +
            "《" + poemData.data.origin.title + "》"
        );
    }

    function getPoem() {
        poemRequest.load((result: any) => {
            // TODO: 处理请求失败
            localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastPoem", JSON.stringify(result));                   // 保存请求结果，防抖节流
            setPoem(result);
        });
    }

    useEffect(() => {
        // 防抖节流
        let lastPoemRequestTime: any = localStorage.getItem("lastPoemRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastPoemRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getPoem();
        } else if (nowTimeStamp - parseInt(lastPoemRequestTime) > 10 * 60 * 1000) {  // 必须多于十分钟才能进行新的请求
            getPoem();
        } else {  // 十分钟之内使用上一次请求结果
            let lastPoem: any = localStorage.getItem("lastPoem");
            if (lastPoem) {
                lastPoem = JSON.parse(lastPoem);
                setPoem(lastPoem);
            } else {
                message.error("获取诗词失败");
            }
        }
    }, []);

    return (
        <Row justify="center" align="middle">
            <Space direction={"vertical"}>
                <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} size={"large"} className="poemText poemFont largeFont"
                            style={{color: props.minorColor}}
                            onClick={poemContentBtnOnClick} onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}>
                        {poemContent.length < poemMaxSize ? poemContent : poemContent.substring(0, poemMaxSize) + "..."}
                    </Button>
                </Col>
                <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} size={"large"} className="poemText poemFont largeFont"
                            style={{color: props.minorColor}}
                            onClick={poemAuthorBtnOnClick} onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}>
                        {poemAuthorDetails.length < poemMaxSize ? poemAuthorDetails : poemAuthorDetails.substring(0, poemMaxSize) + "..."}
                    </Button>
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
    );
}

export default PoemComponent;