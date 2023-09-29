import React, {useEffect, useState} from "react";
import {Button, Space} from "antd";
import {CalendarOutlined, CheckSquareOutlined, InfoCircleOutlined} from "@ant-design/icons";
import "../stylesheets/popupComponent.scss"
import {
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon,
} from "../typescripts/publicFunctions";

function PopupImageComponent(props: any) {
    const [greetIcon, setGreetIcon] = useState(getGreetIcon());
    const [greetContent, setGreetContent] = useState(getGreetContent());
    const [weatherIcon, setWeatherIcon] = useState("");
    const [weatherContent, setWeatherContent] = useState("暂无信息");
    const [dailySize, setDailySize] = useState(0);
    const [todoSize, setTodoSize] = useState(0);
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function greetBtnOnClick() {
        window.open(searchEngineUrl + "万年历", "_blank");
    }

    function weatherBtnOnClick() {
        window.open(searchEngineUrl + "天气", "_blank",);
    }

    function setHoliday(data: any) {
        let holidayContent = data.solarTerms;
        if (data.solarTerms.indexOf("后") === -1) {
            holidayContent = "今日" + holidayContent;
        }
        if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
            holidayContent = holidayContent + " · " + data.typeDes;
        }
        return holidayContent;
    }

    useEffect(() => {
        let tempGreet = localStorage.getItem("lastHoliday");
        let tempWeather = localStorage.getItem("lastWeather");
        let tempDaily = localStorage.getItem("daily");
        let tempTodos = localStorage.getItem("todos");

        setGreetContent(tempGreet ? getGreetContent() + "｜" + setHoliday(JSON.parse(tempGreet)) : "暂无信息");
        setWeatherIcon(tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "");
        setWeatherContent(tempWeather ? JSON.parse(tempWeather).weatherData.weather + "｜" + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息");
        setDailySize(tempDaily ? JSON.parse(tempDaily).length : 0);
        setTodoSize(tempTodos ? JSON.parse(tempTodos).length : 0);
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);
    }, [props.preferenceData.searchEngine])

    return (
        <>
            <Space style={{display: props.preferenceData.simpleMode ? "none" : "inline-flex"}}>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className={greetIcon}> </i>}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        onClick={greetBtnOnClick}
                        className={"popupFont"}
                        style={{color: getFontColor(props.minorColor)}}>
                    {greetContent}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<i className={weatherIcon}> </i>}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        onClick={weatherBtnOnClick}
                        className={"popupFont"}
                        style={{color: getFontColor(props.minorColor)}}>
                    {weatherContent}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                        onMouseOver={btnMouseOver}
                        onMouseOut={btnMouseOut}
                        className={"popupFont"}
                        style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                    {dailySize + " 个倒数日"}
                </Button>
                <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CheckSquareOutlined/>}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"popupFont"}
                        style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                    {todoSize + " 个待办事项"}
                </Button>
            </Space>
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<InfoCircleOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"popupFont"}
                    style={{
                        color: getFontColor(props.minorColor),
                        cursor: "default",
                        display: props.preferenceData.simpleMode ? "inline-block" : "none"
                    }}>
                {"已开启简洁模式"}
            </Button>
        </>
    );
}

export default PopupImageComponent;