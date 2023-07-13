import React, {useEffect, useState} from "react";
import {Popover, Button, Space, Typography} from "antd";
import {
    getWeatherIcon,
    httpRequest
} from "../typescripts/publicFunctions";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;

function WeatherComponent(props: any) {
    const [weatherIcon, setWeatherIcon] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("暂无信息");
    const [region, setRegion] = useState("暂无信息");
    const [humidity, setHumidity] = useState("暂无信息");
    const [pm25, setPm25] = useState("暂无信息");
    const [rainfall, setRainfall] = useState("暂无信息");
    const [visibility, setVisibility] = useState("暂无信息");
    const [windInfo, setWindInfo] = useState("暂无信息");

    function weatherBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=%E5%A4%A9%E6%B0%94", "_blank");
    }

    useEffect(() => {
        function getWeather() {
            let headers = {};
            let url = "https://v2.jinrishici.com/info";
            let data = {};
            httpRequest(headers, url, data, "GET")
                .then(function(resultData: any){
                    localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                    if (resultData.status === "success" && resultData.data.weatherData !== null) {
                        localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                        setWeather(resultData.data);
                    }
                })
                .catch(function(){
                    // 请求失败也更新请求时间，防止超时后无信息可显示
                    localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                });
        }

        function setWeather(data: any) {
            setWeatherIcon(getWeatherIcon(data.weatherData.weather));
            setWeatherInfo(data.weatherData.weather  + "｜" + data.weatherData.temperature + "°C");
            setRegion(data.region.replace("|", " · "));
            setHumidity(data.weatherData.humidity);
            setPm25(data.weatherData.pm25);
            setRainfall(data.weatherData.rainfall + "%");
            setVisibility(data.weatherData.visibility);
            setWindInfo(data.weatherData.windDirection + data.weatherData.windPower + "级");
        }

        // 防抖节流
        let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
        let nowTimeStamp = new Date().getTime();
        if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getWeather();
        }
        else if(nowTimeStamp - parseInt(lastRequestTime) > 0) {  // 必须多于一小时才能进行新的请求
            getWeather();
        }
        else {  // 一小时之内使用上一次请求结果
            let lastWeather: any = localStorage.getItem("lastWeather");
            if (lastWeather) {
                lastWeather = JSON.parse(lastWeather);
                setWeather(lastWeather);
            }
        }
    }, []);

    const popoverContent = (
        <Space direction="vertical">
            <Space>
                <i className="bi bi-moisture"></i>
                <Text style={{color: props.fontColor}} className={"popoverFont"}>{" 空气湿度：" + humidity}</Text>
            </Space>
            <Space>
                <i className="bi bi-water"></i>
                <Text style={{color: props.fontColor}} className={"popoverFont"}>{" 空气质量：" + pm25}</Text>
            </Space>
            <Space>
                <i className="bi bi-cloud-rain"></i>
                <Text style={{color: props.fontColor}} className={"popoverFont"}>{" 降雨概率：" + rainfall}</Text>
            </Space>
            <Space>
                <i className="bi bi-eye"></i>
                <Text style={{color: props.fontColor}} className={"popoverFont"}>{" 视线距离：" + visibility}</Text>
            </Space>
            <Space>
                <i className="bi bi-wind"></i>
                <Text style={{color: props.fontColor}} className={"popoverFont"}>{" 风速情况：" + windInfo}</Text>
            </Space>

            {/*<Button type="text" shape="round" size={"small"} icon={<i className="bi bi-moisture">&nbsp;&nbsp;&nbsp;</i>} style={{color: props.fontColor, cursor: "default"}}>*/}
            {/*    {"空气湿度：" + humidity}*/}
            {/*</Button>*/}
            {/*<Button type="text" shape="round" size={"small"} icon={<i className="bi bi-water">&nbsp;&nbsp;&nbsp;</i>} style={{color: props.fontColor, cursor: "default"}}>*/}
            {/*    {"空气质量：" + pm25}*/}
            {/*</Button>*/}
            {/*<Button type="text" shape="round" size={"small"} icon={<i className="bi bi-cloud-rain">&nbsp;&nbsp;&nbsp;</i>} style={{color: props.fontColor, cursor: "default"}}>*/}
            {/*    {"降雨概率：" + rainfall}*/}
            {/*</Button>*/}
            {/*<Button type="text" shape="round" size={"small"} icon={<i className="bi bi-eye">&nbsp;&nbsp;&nbsp;</i>} style={{color: props.fontColor, cursor: "default"}}>*/}
            {/*    {"视线距离：" + visibility}*/}
            {/*</Button>*/}
            {/*<Button type="text" shape="round" size={"small"} icon={<i className="bi bi-wind">&nbsp;&nbsp;&nbsp;</i>} style={{color: props.fontColor, cursor: "default"}}>*/}
            {/*    {"风速情况：" + windInfo}*/}
            {/*</Button>*/}
        </Space>
    );

    return (
        <Popover title={region} content={popoverContent}
                 placement="bottomLeft" color={"transparent"}>
            <Button type="text" shape="round" size={"large"} icon={<i className={weatherIcon}>&nbsp;</i>}
                    onClick={weatherBtnOnClick}
                    className={"buttonFont"}
                    style={{
                        color: props.fontColor,
                    }}
            >
                {weatherInfo}
            </Button>
        </Popover>
    );

}

export default WeatherComponent;