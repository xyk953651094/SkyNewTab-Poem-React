import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Space} from "antd";
import "../stylesheets/poemComponent.scss"
import {getFontColor, getSearchEngineDetail, btnMouseOver, btnMouseOut} from "../typescripts/publicFunctions";
import {ReadOutlined, UserOutlined} from "@ant-design/icons";

const poemMaxSize = 25;

function PopupPoemComponent(props: any) {
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时。");
    const [poemAuthor, setPoemAuthor] = useState("张九龄");
    const [poemAuthorDetails, setPoemAuthorDetails] = useState("【唐】张九龄 ·《望月怀远》");

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
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);

        function getPoem() {
            let poemData = localStorage.getItem("lastPoem");
            if (poemData) {
                setPoem(JSON.parse(poemData));
            }
        }

        getPoem();
    }, [props.preferenceData.searchEngine]);

    return (
        <Row justify="center" align="middle">
            <Space direction={"vertical"}>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<ReadOutlined />} className="popupFont"
                            style={{color: getFontColor(props.minorColor)}}
                            onClick={poemContentBtnOnClick} onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}>
                        {/*{"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好..."}*/}
                        {poemContent.length < poemMaxSize ? poemContent : poemContent.substring(0, poemMaxSize) + "..."}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<UserOutlined />} className="popupFont"
                            style={{color: getFontColor(props.minorColor)}}
                            onClick={poemAuthorBtnOnClick} onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}>
                        {poemAuthorDetails.length < poemMaxSize ? poemAuthorDetails : poemAuthorDetails.substring(0, poemMaxSize) + "..."}
                    </Button>
                </Col>
            </Space>
        </Row>
    );
}

export default PopupPoemComponent;