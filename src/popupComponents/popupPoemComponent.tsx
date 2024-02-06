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
    const [customPoem, setCustomPoem] = useState(false);

    function poemContentBtnOnClick() {
        window.open(searchEngineUrl + poemContent, "_blank");
    }

    function poemAuthorBtnOnClick() {
        window.open(searchEngineUrl + poemAuthor, "_blank");
    }

    function setPoem(poemData: any) {
        let tempPoemContent = poemData.data.content.length < poemMaxSize ?
            poemData.data.content : poemData.data.content.substring(0, poemMaxSize) + "...";

        let tempPoemAuthor =
            "【" + poemData.data.origin.dynasty + "】" +
            poemData.data.origin.author + " ·" +
            "《" + poemData.data.origin.title + "》";
        tempPoemAuthor = tempPoemAuthor.length < poemMaxSize ?
            tempPoemAuthor : tempPoemAuthor.substring(0, poemMaxSize) + "...";

        setPoemContent(tempPoemContent);
        setPoemAuthor(tempPoemAuthor);
    }

    function getPoem() {
        let poemData = localStorage.getItem("lastPoem");
        if (poemData) {
            setPoem(JSON.parse(poemData));
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
            }
        } else {
            getPoem();
        }
    }, [props.preferenceData.searchEngine]);

    return (
        <Row justify="center" align="middle">
            <Space direction={"vertical"}>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<ReadOutlined/>}
                            className="popupFont"
                            style={{color: getFontColor(props.minorColor)}}
                            onClick={poemContentBtnOnClick} onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}>
                        {poemContent}
                    </Button>
                </Col>
                <Col span={24}>
                    <Button type="text" shape={props.preferenceData.buttonShape} icon={<UserOutlined/>}
                            className="popupFont"
                            style={{color: getFontColor(props.minorColor)}}
                            onClick={poemAuthorBtnOnClick} onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}>
                        {poemAuthor}
                    </Button>
                </Col>
            </Space>
        </Row>
    );
}

export default PopupPoemComponent;