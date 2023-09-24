import React, {useEffect, useState} from "react";
import {Button, Col, Popover, Row, Space, Typography} from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    HistoryOutlined,
    InfoCircleOutlined,
    StarOutlined
} from "@ant-design/icons";
import {
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getTimeDetails,
    httpRequest
} from "../typescripts/publicFunctions";
import "../stylesheets/publicStyles.scss"

const {Text} = Typography;
const btnMaxSize = 80;

function GreetComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [greetIcon, setGreetIcon] = useState(getGreetIcon());
    const [greetContent, setGreetContent] = useState(getGreetContent());
    const [holidayContent, setHolidayContent] = useState("");
    const [calendar, setCalendar] = useState(getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek);
    const [suit, setSuit] = useState("暂无信息");
    const [avoid, setAvoid] = useState("暂无信息");

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    function infoBtnOnClick() {
        window.open(searchEngineUrl + "万年历", "_blank");
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);

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

            setHolidayContent(holidayContent);
            setCalendar(timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" +
                data.yearTips + data.chineseZodiac + "年｜" +
                data.lunarCalendar + "｜" + data.constellation);
            setSuit(data.suit.replace(/\./g, " · "));
            setAvoid(data.avoid.replace(/\./g, " · "));
        }

        // 防抖节流
        if (!props.preferenceData.simpleMode) {
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

            setInterval(() => {
                setGreetIcon(getGreetIcon());
                setGreetContent(getGreetContent());
            }, 60 * 60 * 1000);
        }
    }, [props.preferenceData.searchEngine, props.preferenceData.simpleMode]);

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={10}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"万年历"}</Text>
            </Col>
            <Col span={14} style={{textAlign: "right"}}>
                <Button type={"text"} shape={"round"} icon={<InfoCircleOutlined/>} onClick={infoBtnOnClick}
                        onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                        className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"更多信息"}
                </Button>
            </Col>
        </Row>
    );

    const popoverContent = (
        <Space direction="vertical">
            <Button type={"text"} shape={"round"} icon={<CalendarOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {calendar}
            </Button>
            <Button type="text" shape="round" icon={<CheckCircleOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {"宜：" + (suit.length < btnMaxSize) ? suit : suit.substring(0, btnMaxSize) + "..."}
            </Button>
            <Button type="text" shape="round" icon={<CloseCircleOutlined/>}
                    onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {"忌：" + (avoid.length < btnMaxSize) ? avoid : avoid.substring(0, btnMaxSize) + "..."}
            </Button>
        </Space>
    );

    return (
        <Popover
            title={popoverTitle} content={popoverContent}
            placement="bottomLeft" overlayStyle={{minWidth: "550px"}} color={props.minorColor}>
            <Button type="text" shape="round" size={"large"} icon={<i className={greetIcon}></i>}
                    className={"componentTheme poemFont"}
                    style={{
                        display: display,
                        cursor: "default",
                        color: getFontColor(props.minorColor),
                        backgroundColor: props.minorColor
                    }}
            >
                {greetContent + "｜" + holidayContent}
            </Button>
        </Popover>
    );
}

export default GreetComponent;