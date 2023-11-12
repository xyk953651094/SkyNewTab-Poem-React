import React, {useEffect, useState} from "react";
import {Row, Col, Typography, Space} from "antd";
import "../stylesheets/clockComponent.scss"

const {Text} = Typography;
const $ = require("jquery");

function ClockComponent(props: any) {
    const [currentTime, setCurrentTime] = useState(getLocaleTime());
    const [currentDate, setCurrentDate] = useState("暂无信息");
    const [currentYear, setCurrentYear] = useState("暂无信息");

    function btnMouseOver(e: any) {
        $(".clockText, .dateText").removeClass("textShadow").css("color", props.majorColor);
        e.currentTarget.style.backgroundColor = props.minorColor;
        e.currentTarget.classList.add("componentTheme");
    }

    function btnMouseOut(e: any) {
        $(".clockText, .dateText").addClass("textShadow").css("color", props.minorColor);
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.classList.remove("componentTheme");
    }

    function getLocaleTime() {
        let currentTime = new Date().getHours();
        let localeTime = "";
        switch (currentTime) {
            case 0: localeTime = "子正时"; break;
            case 1: localeTime = "丑初时"; break;
            case 2: localeTime = "丑正时"; break;
            case 3: localeTime = "寅初时"; break;
            case 4: localeTime = "寅正时"; break;
            case 5: localeTime = "卯初时"; break;
            case 6: localeTime = "卯正时"; break;
            case 7: localeTime = "辰初时"; break;
            case 8: localeTime = "辰正时"; break;
            case 9: localeTime = "巳初时"; break;
            case 10: localeTime = "巳正时"; break;
            case 11: localeTime = "午初时"; break;
            case 12: localeTime = "午正时"; break;
            case 13: localeTime = "未初时"; break;
            case 14: localeTime = "未正时"; break;
            case 15: localeTime = "申初时"; break;
            case 16: localeTime = "申正时"; break;
            case 17: localeTime = "酉初时"; break;
            case 18: localeTime = "酉正时"; break;
            case 19: localeTime = "戌初时"; break;
            case 20: localeTime = "戌正时"; break;
            case 21: localeTime = "亥初时"; break;
            case 22: localeTime = "亥正时"; break;
            case 23: localeTime = "子初时"; break;
        }
        return localeTime;
    }

    useEffect(() => {
        let lastHolidayStorage = localStorage.getItem("lastHoliday");
        if (lastHolidayStorage) {
            let lastHoliday = JSON.parse(lastHolidayStorage);
            setCurrentDate(lastHoliday.lunarCalendar);
            setCurrentYear(lastHoliday.yearTips + lastHoliday.chineseZodiac + "年");
        }

        // 每分钟刷新一次（日期与年份取的是万年历中请求的缓存数据，存在请求间隔，因此无法及时更新，只能更新时间）
        setInterval(() => {
            setCurrentTime(getLocaleTime());
        }, 60 * 1000);
    }, [])

    return (
        <Row justify={"center"}>
            <Col span={24} id={"clockDiv"} className={"zIndexHigh"}
                 style={{padding: "5px 10px", borderRadius: "8px", maxWidth: "max-content"}}
                 onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}>
                <Space align={"center"} id={"clock"}>
                    <Text className={"textShadow clockText poemFont"} style={{color: props.minorColor}}>
                        {currentTime}
                    </Text>
                    <Space align={"center"} direction={"vertical"}>
                        <Text className={"textShadow dateText poemFont"} style={{color: props.minorColor}}>
                            {currentYear}
                        </Text>
                        <Text className={"textShadow dateText poemFont"} style={{color: props.minorColor}}>
                            {currentDate}
                        </Text>
                    </Space>
                </Space>
            </Col>
        </Row>
    );
}

export default ClockComponent;