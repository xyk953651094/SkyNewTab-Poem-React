import React, {useEffect, useState} from "react";
import {Button, Col, List, message, Popover, Row, Space, Typography} from "antd";
import {EnvironmentOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {getFontColor, getSearchEngineDetail, getWeatherIcon, httpRequest,} from "../typescripts/publicFunctions";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;

function WeatherComponent(props: any) {
    const [display, setDisplay] = useState(props.preferenceData.simpleMode ? "none" : "block");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [weatherContent, setWeatherContent] = useState("暂无信息");
    const [location, setLocation] = useState("暂无信息");
    const [humidity, setHumidity] = useState("暂无信息");
    const [pm25, setPm25] = useState("暂无信息");
    const [rainfall, setRainfall] = useState("暂无信息");
    const [visibility, setVisibility] = useState("暂无信息");
    const [windInfo, setWindInfo] = useState("暂无信息");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function locationBtnOnClick() {
        if (location !== "暂无信息") {
            window.open(searchEngineUrl + location, "_blank");
        } else {
            message.error("无跳转链接");
        }
    }

    function infoBtnOnClick() {
        window.open(searchEngineUrl + "天气", "_blank");
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);

        function getWeather() {
            let headers = {};
            let url = "https://v2.jinrishici.com/info";
            let data = {};
            httpRequest(headers, url, data, "GET")
                .then(function (resultData: any) {
                    localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                    if (resultData.status === "success" && resultData.data.weatherData !== null) {
                        localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                        setWeather(resultData.data);
                    }
                })
                .catch(function () {
                    // 请求失败也更新请求时间，防止超时后无信息可显示
                    localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                });
        }

        function setWeather(data: any) {
            setWeatherIcon(getWeatherIcon(data.weatherData.weather));
            setWeatherContent(data.weatherData.weather + "｜" + data.weatherData.temperature + "°C");
            setLocation(data.region.replace("|", " · "));
            setHumidity(data.weatherData.humidity);
            setPm25(data.weatherData.pm25);
            setRainfall(data.weatherData.rainfall + "%");
            setVisibility(data.weatherData.visibility);
            setWindInfo(data.weatherData.windDirection + " " + data.weatherData.windPower + " 级");
        }

        // 防抖节流
        if (!props.preferenceData.simpleMode) {
            let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                getWeather();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 0) {  // 必须多于一小时才能进行新的请求
                getWeather();
            } else {  // 一小时之内使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    setWeather(lastWeather);
                }
            }
        }
    }, [props.preferenceData.searchEngine, props.preferenceData.simpleMode]);

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={6}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"天气信息"}</Text>
            </Col>
            <Col span={18} style={{textAlign: "right"}}>
                <Space>
                    <Button type={"text"} shape={"round"} icon={<EnvironmentOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            onClick={locationBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {location}
                    </Button>
                    <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            onClick={infoBtnOnClick}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {"更多信息"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List>
            <List.Item>
                <Space direction="vertical">
                    <Button type="text" shape="round" icon={<i className="bi bi-moisture">&nbsp;&nbsp;&nbsp;</i>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"空气湿度：" + humidity}
                    </Button>
                    <Button type="text" shape="round" icon={<i className="bi bi-water">&nbsp;&nbsp;&nbsp;</i>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"空气质量：" + pm25}
                    </Button>
                    <Button type="text" shape="round" icon={<i className="bi bi-cloud-rain">&nbsp;&nbsp;&nbsp;</i>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"降雨概率：" + rainfall}
                    </Button>
                    <Button type="text" shape="round" icon={<i className="bi bi-eye">&nbsp;&nbsp;&nbsp;</i>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"视线距离：" + visibility}
                    </Button>
                    <Button type="text" shape="round" icon={<i className="bi bi-wind">&nbsp;&nbsp;&nbsp;</i>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                        {"风速情况：" + windInfo}
                    </Button>
                </Space>
            </List.Item>
        </List>
    );

    return (
        <Popover title={popoverTitle} content={popoverContent} color={props.minorColor}
                 placement="bottomLeft" overlayStyle={{minWidth: "350px"}}>
            <Button type="text" shape="round" size={"large"} icon={<i className={weatherIcon}></i>}
                    className={"componentTheme poemFont"}
                    style={{
                        display: display,
                        cursor: "default",
                        color: getFontColor(props.minorColor),
                        backgroundColor: props.minorColor
                    }}
            >
                {weatherContent}
            </Button>
        </Popover>
    );
}

export default WeatherComponent;