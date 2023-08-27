import React, {useEffect, useState} from 'react';
import {Col, Layout, Row, Space} from "antd";
import "./stylesheets/publicStyles.scss"
import {themeArray} from "./typescripts/publicConstants";

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import SunComponent from "./components/sunComponent";
import PoemComponent from "./components/poemComponent";
import WaveComponent from "./components/waveComponent";
import {getFontColor} from "./typescripts/publicFunctions";

const {Header, Content, Footer} = Layout;
const $ = require('jquery');

function App() {
    const [majorColor, setMajorColor] = useState("#000000");
    const [minorColor, setMinorColor] = useState("#ffffff");
    const [svgColors, setSvgColors] = useState(['#ffffff', '#ffffff', '#ffffff', '#ffffff']);

    useEffect(() => {
        // 随机颜色主题
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        setMajorColor(themeArray[randomNum].majorColor);
        setMinorColor(themeArray[randomNum].minorColor);
        setSvgColors(themeArray[randomNum].svgColors);

        let bodyEle = $("body");
        bodyEle.css("background-color", themeArray[randomNum].majorColor);

        // 修改弹窗主题
        bodyEle.bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                // $(".ant-popover-arrow").css("display", "none");
                // $(".ant-popover-inner").css("box-shadow", "none");
                $(".ant-popover-title").css({
                    "color": getFontColor(minorColor),
                    "font-family": "'Times New Roman', cursive, sans-serif",
                    "font-size": "20px",
                });
                // $(".ant-popover-inner-content").css("color", getFontColor(minorColor));
            }
        });
    }, [minorColor]);

    return (
        <Layout>
            <Header id={"header"} className={"zIndexMiddle"}>
                <Row justify="center">
                    <Col xs={22} sm={22} md={9} lg={9} xl={9} xxl={9}>
                        <GreetComponent majorColor={majorColor} minorColor={minorColor}/>
                    </Col>
                    <Col xs={0} sm={0} md={9} lg={9} xl={9} xxl={9} style={{textAlign: "right"}}>
                        <Space size={"small"}>
                            <WeatherComponent  majorColor={majorColor} minorColor={minorColor}/>
                        </Space>
                    </Col>
                </Row>
                <SunComponent sunColors={svgColors}/>
            </Header>
            <Content id={"content"} className="center">
                <PoemComponent minorColor={minorColor}/>
            </Content>
            <Footer id={"footer"}>
                <WaveComponent waveColors={svgColors}/>
            </Footer>
        </Layout>
    );
}

export default App;
