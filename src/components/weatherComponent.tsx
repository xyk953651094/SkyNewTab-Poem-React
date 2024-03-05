import React, {useEffect, useState} from "react";
import {Button, Col, List, message, Popover, Row, Space, Typography} from "antd";
import {BulbOutlined, ClockCircleOutlined, EnvironmentOutlined, MoreOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getSearchEngineDetail,
    getTimeDetails,
    getWeatherIcon,
    httpRequest
} from "../typescripts/publicFunctions";
import "../stylesheets/publicStyles.scss"
import PopoverComponent from "../publicComponent/popoverComponent";

const {Text} = Typography;

function WeatherComponent(props: any) {
    const [display, setDisplay] = useState(props.preferenceData.simpleMode ? "none" : "block");
    const [lastRequestTime, setLastRequestTime] = useState("暂无信息");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [weatherContent, setWeatherContent] = useState("暂无信息");
    const [weatherTips, setWeatherTips] = useState("");
    const [location, setLocation] = useState("暂无信息");
    const [humidity, setHumidity] = useState("暂无信息");
    const [pm25, setPm25] = useState("暂无信息");
    const [rainfall, setRainfall] = useState("暂无信息");
    const [visibility, setVisibility] = useState("暂无信息");
    const [windInfo, setWindInfo] = useState("暂无信息");

    function infoBtnOnClick() {
        window.open(searchEngineUrl + "天气", "_self");
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
                    // localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

                    // 请求失败时使用上一次请求结果
                    let lastWeather: any = localStorage.getItem("lastWeather");
                    if (lastWeather) {
                        lastWeather = JSON.parse(lastWeather);
                        setWeather(lastWeather);
                    }
                });
        }

        function setWeather(data: any) {
            setWeatherIcon(getWeatherIcon(data.weatherData.weather));
            setWeatherContent(data.weatherData.weather + " ｜ " + data.weatherData.temperature + "°C");
            setLocation(data.region.replace("|", " · "));
            setHumidity(data.weatherData.humidity);
            setPm25(data.weatherData.pm25);
            setRainfall(data.weatherData.rainfall + "%");
            setVisibility(data.weatherData.visibility);
            setWindInfo(data.weatherData.windDirection + " " + data.weatherData.windPower + " 级");

            if (parseInt(data.weatherData.temperature) > 30) {
                setWeatherTips("天气炎热，请注意避暑，减少户外活动");
            } else if (parseInt(data.weatherData.temperature) < 0) {
                setWeatherTips("天气寒冷，请注意防寒，减少户外活动");
            }
        }

        // 防抖节流
        if (!props.preferenceData.simpleMode) {
            let tempLastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (tempLastRequestTime === null) {  // 第一次请求时 tempLastRequestTime 为 null，因此直接进行请求赋值 tempLastRequestTime
                getWeather();
            } else if (nowTimeStamp - parseInt(tempLastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
                getWeather();
            } else {  // 一小时之内使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    setWeather(lastWeather);
                }
            }

            if (tempLastRequestTime !== null) {
                setLastRequestTime(getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail);
            }
        }
    }, [props.preferenceData.searchEngine, props.preferenceData.simpleMode]);

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={10}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"天气信息"}</Text>
            </Col>
            <Col span={14} style={{textAlign: "right"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<MoreOutlined/>}
                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                        onClick={infoBtnOnClick}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"更多信息"}
                </Button>
            </Col>
        </Row>
    );

    const popoverContent = (
        <List>
            <List.Item>
                <Row gutter={[0, 8]}>
                    <Col span={24} style={{display: weatherTips.length === 0 ? "none" : "block"}}>
                        <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<BulbOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {weatherTips}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<EnvironmentOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"地理位置：" + location}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="text" shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-wind"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"风速情况：" + windInfo}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="text" shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-moisture"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"空气湿度：" + humidity + "%"}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="text" shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-water"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"空气质量：" + pm25}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="text" shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-cloud-rain"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"降雨概率：" + rainfall}
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="text" shape={props.preferenceData.buttonShape}
                                icon={<i className="bi bi-eye"></i>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"视线距离：" + visibility}
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<ClockCircleOutlined/>}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                            {"上次更新：" + lastRequestTime}
                        </Button>
                    </Col>
                </Row>
            </List.Item>
        </List>
    );

    return (
        <Popover title={popoverTitle} content={popoverContent} color={props.minorColor}
                 placement="bottomLeft" overlayStyle={{width: "450px"}}>
            <Button type="text" shape={props.preferenceData.buttonShape} size={"large"}
                    icon={<i className={weatherIcon}></i>}
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