import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Space} from "antd";
import "../stylesheets/poemComponent.scss"
import {btnMouseOut, btnMouseOver, getFontColor, getSearchEngineDetail} from "../typescripts/publicFunctions";
import {ReadOutlined, UserOutlined} from "@ant-design/icons";

const poemMaxSize = 25;

function PopupPoemComponent(props: any) {
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时。");
    const [poemAuthor, setPoemAuthor] = useState("【唐】张九龄 ·《望月怀远》");

    function poemContentBtnOnClick() {
        window.open(searchEngineUrl + poemContent, "_blank");
    }

    function poemAuthorBtnOnClick() {
        window.open(searchEngineUrl + poemAuthor, "_blank");
    }

    function setPoem() {
        let poemDataStorage = localStorage.getItem("lastPoem");
        if (poemDataStorage) {
            let poemData = JSON.parse(poemDataStorage);
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
    }

    useEffect(() => {
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);

        let tempCustomPoem = false;
        let customPoemStorage = localStorage.getItem("customPoem");
        if (customPoemStorage) {
            tempCustomPoem = JSON.parse(customPoemStorage);
        } else {
            localStorage.setItem("customPoem", JSON.stringify(false));
        }

        if (tempCustomPoem) {
            let customContentStorage = localStorage.getItem("customContent");
            let customAuthorStorage = localStorage.getItem("customAuthor");
            if (customContentStorage && customAuthorStorage) {
                setPoemContent(customContentStorage.length < poemMaxSize ?
                    customContentStorage : customContentStorage.substring(0, poemMaxSize) + "...");
                setPoemAuthor(customAuthorStorage.length < poemMaxSize ?
                    customAuthorStorage : customAuthorStorage.substring(0, poemMaxSize) + "...");
            }
        } else {
            setPoem();
        }
    }, [props.preferenceData.autoTopic, props.preferenceData.searchEngine]);

    return (
        <Row justify="center" align="middle">
            <Space direction={"vertical"}>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<ReadOutlined/>}
                            className="popupFont"
                            style={{color: getFontColor(props.majorColor)}}
                            onClick={poemContentBtnOnClick} onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.majorColor, e)}>
                        {poemContent}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<UserOutlined/>}
                            className="popupFont"
                            style={{color: getFontColor(props.majorColor)}}
                            onClick={poemAuthorBtnOnClick} onMouseOver={(e) => btnMouseOver(props.minorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.majorColor, e)}>
                        {poemAuthor}
                    </Button>
                </Col>
            </Space>
        </Row>
    );
}

export default PopupPoemComponent;