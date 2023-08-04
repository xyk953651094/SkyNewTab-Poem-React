import React, {useEffect, useState} from "react";
import {Button, Popover, Space, Typography} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {device} from "../typescripts/publicConstants";
import {getFontColor, getGreetContent, getGreetIcon, getTimeDetails, httpRequest} from "../typescripts/publicFunctions";
import "../stylesheets/publicStyles.scss"

const {Title, Text} = Typography;

function GreetComponent(props: any) {
    const [greet, setGreet] = useState(getGreetContent());
    const [greetIcon, setGreetIcon] = useState(getGreetIcon());
    const [calendar, setCalendar] = useState(getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek);
    const [suit, setSuit] = useState("暂无信息");
    const [avoid, setAvoid] = useState("暂无信息");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.fontColor;
        e.currentTarget.style.color = getFontColor(props.fontColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = props.fontColor;
    }

    function greetBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=日历", "_blank");
    }

    useEffect(() => {
        // 获取节假日信息
        function getHoliday() {
            let headers = {};
            let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
            let data = {
                "app_id": "cicgheqakgmpjclo",
                "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
            };
            httpRequest(headers, url, data, "GET")
                .then(function (resultData: any) {
                    localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                    if (resultData.code === 1) {
                        localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                        setHoliday(resultData.data);
                    }
                })
                .catch(function () {
                    // 请求失败也更新请求时间，防止超时后无信息可显示
                    localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                });
        }

        // 请求完成后处理步骤
        function setHoliday(data: any) {
            let holidayContent = data.solarTerms;
            if (data.solarTerms.indexOf("后") === -1) {
                holidayContent = "今日" + holidayContent;
            }
            if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
                holidayContent = holidayContent + " · " + data.typeDes;
            }
            let timeDetails = getTimeDetails(new Date());
            setGreet(getGreetContent() + "｜" + holidayContent);
            setCalendar(timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" +
                data.yearTips + data.chineseZodiac + "年｜" +
                data.lunarCalendar);
            setSuit(data.suit.replace(/\./g, " · "));
            setAvoid(data.avoid.replace(/\./g, " · "));
        }

        // 防抖节流
        let lastRequestTime: any = localStorage.getItem("lastHolidayRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            getHoliday();
        } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
            getHoliday();
        } else {  // 一小时之内使用上一次请求结果
            let lastHoliday: any = localStorage.getItem("lastHoliday");
            if (lastHoliday) {
                lastHoliday = JSON.parse(lastHoliday);
                setHoliday(lastHoliday);
            }
        }
    }, []);

    const popoverContent = (
        <Space direction="vertical">
            <Button type="text" shape="round" icon={<CheckCircleOutlined/>} onMouseOver={btnMouseOver}
                    onMouseOut={btnMouseOut}
                    className={"popoverFont"} style={{color: props.fontColor, cursor: "default"}}>
                {"宜：" + suit}
            </Button>
            <Button type="text" shape="round" icon={<CloseCircleOutlined/>} onMouseOver={btnMouseOver}
                    onMouseOut={btnMouseOut}
                    className={"popoverFont"} style={{color: props.fontColor, cursor: "default"}}>
                {"忌：" + avoid}
            </Button>
        </Space>
    );

    return (
        <Popover
            title={calendar} content={popoverContent}
            placement="bottomLeft" color={"transparent"}>
            <Button type="text" shape="round" size={"large"} icon={<i className={greetIcon}>&nbsp;</i>}
                    className={"buttonFont"}
                    onClick={greetBtnOnClick} onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    style={{
                        color: props.fontColor
                    }}
            >
                {(device === "iPhone" || device === "Android") ? getGreetContent() : greet}
            </Button>
        </Popover>
    );
}

export default GreetComponent;