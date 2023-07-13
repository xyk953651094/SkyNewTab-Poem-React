import React, {useEffect, useState} from 'react';
import {Col, Button, Space, message} from "antd";
import "../stylesheets/publicStyles.scss";
const poemRequest = require('jinrishici');

function PoemComponent(props: any) {
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时");
    const [poemAuthor, setPoemAuthor] = useState("张九龄");
    const [poemAuthorDetails, setPoemAuthorDetails] = useState("【唐】张九龄 ·《望月怀远》");

    function poemContentBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=" + poemContent, "_blank");
    }

    function poemAuthorBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=" + poemAuthor, "_blank");
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
            localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastPoem", JSON.stringify(result));                   // 保存请求结果，防抖节流
            setPoem(result);
        });
    }

    useEffect(() => {
        // 防抖节流
        let lastPoemRequestTime: any = localStorage.getItem("lastPoemRequestTime");
        let nowTimeStamp = new Date().getTime();
        if(lastPoemRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getPoem();
        }
        else if(nowTimeStamp - parseInt(lastPoemRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
            getPoem();
        }
        else {  // 一分钟之内使用上一次请求结果
            let lastPoem: any = localStorage.getItem("lastPoem");
            if (lastPoem) {
                lastPoem = JSON.parse(lastPoem);
                setPoem(lastPoem);
            }
            else {
                message.error("获取诗词失败");
            }
        }
    }, []);

    return (
        <Space direction="vertical">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={"center"}>
                <Button type="text" shape="round" size={"large"}
                        className="buttonFont" onClick={poemContentBtnOnClick} style={{color: props.fontColor}}>
                    {poemContent}
                </Button>
            </Col>
            <Col xs={0} sm={0} md={0} lg={24} xl={24} className={"center"}>
                <Button type="text" shape="round" size={"large"}
                        className="buttonFont" onClick={poemAuthorBtnOnClick} style={{color: props.fontColor}}>
                    {poemAuthorDetails}
                </Button>
            </Col>
        </Space>
    );
}

export default PoemComponent;