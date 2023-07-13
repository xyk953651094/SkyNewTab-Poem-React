import React, {useState, useEffect} from 'react';
import {Layout, Row, Col, Space} from "antd";
import "./stylesheets/publicStyles.scss"
import {themeArray} from "./typescripts/publicConstants";

import GreetComponent from "./components/greetComponent";
import WeatherComponent from "./components/weatherComponent";
import SunComponent from "./components/sunComponent";
import PoemComponent from "./components/poemComponent";
import WaveComponent from "./components/waveComponent";


const {Header, Content, Footer} = Layout;
const $ = require('jquery');

function App() {
    const [fontColor, setFontColor] = useState("#ffffff");
    const [svgColor, setSvgColor] = useState(['#ffffff', '#ffffff', '#ffffff', '#ffffff']);

    useEffect(() => {
        let bodyEle = $("body");

        // 随机颜色主题
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        bodyEle.css("background-color", themeArray[randomNum].bodyBackgroundColor);
        setFontColor(themeArray[randomNum].fontColor);
        setSvgColor(themeArray[randomNum].svgColor);

        // 修改弹窗主题
        bodyEle.bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-arrow").css("display", "none");
                $(".ant-popover-inner").css("box-shadow", "none");
                $(".ant-popover-title").css({"color": fontColor, "font-family": "cursive, SimSun, Arial, Helvetica, sans-serif", "font-size": "20px"});
                $(".ant-popover-inner-content").css("color", fontColor);
            }
        });
    }, [fontColor]);

    return (
        <Layout>
            <Header id={"header"} className={"zIndexMiddle"}>
                <Row justify="center">
                    <Col xs={0} sm={0} md={10} lg={10} xl={10}>
                        <GreetComponent fontColor={fontColor} />
                    </Col>
                    <Col xs={0} sm={0} md={10} lg={10} xl={10} style={{textAlign: "right"}}>
                        <Space size={"small"}>
                            <WeatherComponent fontColor={fontColor} />
                        </Space>
                    </Col>
                    <SunComponent sunColor={svgColor}/>
                </Row>
            </Header>
            <Content id={"content"} className="center">
                <PoemComponent fontColor={fontColor} />
            </Content>
            <Footer id={"footer"}>
                <WaveComponent waveColor={svgColor}/>
            </Footer>
        </Layout>
    );
}

export default App;
