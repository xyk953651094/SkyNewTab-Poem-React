import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space} from "antd";
import "../stylesheets/publicStyles.scss";
const poemRequest = require('jinrishici');

function PoemComponent(props: any) {
    const [poemContent, setPoemContent] = useState("海上生明月，天涯共此时");
    const [poemAuthor, setPoemAuthor] = useState("张九龄");
    const [poemAuthorDetails, setPoemAuthorDetails] = useState("【唐】张九龄 ·《望月怀远》");

    function poemContentButtonOnClick() {
        window.open("https://cn.bing.com/search?&q=" + poemContent, "_blank");
    }

    function poemAuthorButtonOnClick() {
        window.open("https://cn.bing.com/search?&q=" + poemAuthor, "_blank");
    }

    useEffect(() => {
        poemRequest.load((result: any) => {
            setPoemContent(result.data.content);
            setPoemAuthor(result.data.origin.author);
            setPoemAuthorDetails("【" + result.data.origin.dynasty + "】" +
                result.data.origin.author + " ·" +
                "《" + result.data.origin.title + "》"
            );
        });
    }, []);

    return (
        <Space direction="vertical">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={"center"}>
                <Button type="text" shape="round" size={"large"}
                        className="buttonFont" onClick={poemContentButtonOnClick} style={{color: props.fontColor}}>
                    {poemContent}
                </Button>
            </Col>
            <Col xs={0} sm={0} md={0} lg={24} xl={24} className={"center"}>
                <Button type="text" shape="round" size={"large"}
                        className="buttonFont" onClick={poemAuthorButtonOnClick} style={{color: props.fontColor}}>
                    {poemAuthorDetails}
                </Button>
            </Col>
        </Space>
    );
}

export default PoemComponent;