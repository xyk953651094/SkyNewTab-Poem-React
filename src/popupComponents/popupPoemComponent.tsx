import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Space} from "antd";
import "../stylesheets/poemComponent.scss"
import {getFontColor} from "../typescripts/publicFunctions";

const poemMaxSize = 25;

function PopupPoemComponent(props: any) {
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时。");
    const [poemAuthor, setPoemAuthor] = useState("张九龄");
    const [poemAuthorDetails, setPoemAuthorDetails] = useState("【唐】张九龄 ·《望月怀远》");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.minorColor;
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

    useEffect(() => {
        function getPoem() {
            let poemData = localStorage.getItem("lastPoem");
            if(poemData){
                setPoem(JSON.parse(poemData));
            }
        }

        getPoem();
    }, []);

    return (
        <Row justify="center" align="middle">
            <Space direction={"vertical"}>
                <Col span={24}>
                    <Button type="text" shape="round" className="popupFont"
                            style={{color: props.minorColor}}
                            onClick={poemContentBtnOnClick} onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}>
                        {/*{"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好..."}*/}
                        {poemContent.length < poemMaxSize ? poemContent : poemContent.substring(0, poemMaxSize) + "..."}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type="text" shape="round" className="popupFont"
                            style={{color: props.minorColor}}
                            onClick={poemAuthorBtnOnClick} onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}>
                        {poemAuthorDetails.length < poemMaxSize ? poemAuthorDetails : poemAuthorDetails.substring(0, poemMaxSize) + "..."}
                    </Button>
                </Col>
            </Space>
        </Row>
    );
}

export default PopupPoemComponent;