import React, {useEffect, useState} from "react";
import {Button, Col, Popover, Row, Space, Typography} from "antd";
import {
    CalendarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    HistoryOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
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
    const [holidayContent, setHolidayContent] = useState("暂无信息");
    const [calendar, setCalendar] = useState(getTimeDetails(new Date()).showDate4 + " " + getTimeDetails(new Date()).showWeek);
    const [suit, setSuit] = useState("暂无信息");
    const [avoid, setAvoid] = useState("暂无信息");

    function historyBtnOnClick() {
        window.open(searchEngineUrl + "历史上的今天", "_blank");
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
                        props.getHolidayData(resultData.data);                                     // 通知父组件更新节假日信息
                        setHoliday(resultData.data);
                    }
                })
                .catch(function () {
                    // 请求失败时使用上一次请求结果
                    let lastHoliday: any = localStorage.getItem("lastHoliday");
                    if (lastHoliday) {
                        lastHoliday = JSON.parse(lastHoliday);
                        setHoliday(lastHoliday);
                    }
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
                <Space>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<HistoryOutlined/>} onClick={historyBtnOnClick}
                            onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {"历史上的今天"}
                    </Button>
                    <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<MoreOutlined/>} onClick={infoBtnOnClick}
                            onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                            className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                        {"更多信息"}
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    const popoverContent = (
        <Space direction="vertical">
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<CalendarOutlined/>}
                    onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {calendar}
            </Button>
            <Button type="text" shape={props.preferenceData.buttonShape} icon={<CheckCircleOutlined/>}
                    onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {"宜：" + (suit.length < btnMaxSize) ? suit : suit.substring(0, btnMaxSize) + "..."}
            </Button>
            <Button type="text" shape={props.preferenceData.buttonShape} icon={<CloseCircleOutlined/>}
                    onMouseOver={(e)=>btnMouseOver(props.majorColor, e)} onMouseOut={(e)=>btnMouseOut(props.minorColor, e)}
                    className={"poemFont"} style={{color: getFontColor(props.minorColor), cursor: "default"}}>
                {"忌：" + (avoid.length < btnMaxSize) ? avoid : avoid.substring(0, btnMaxSize) + "..."}
            </Button>
        </Space>
    );

    return (
        <Popover
            title={popoverTitle} content={popoverContent}
            placement="bottomLeft" overlayStyle={{minWidth: "550px"}} color={props.minorColor}>
            <Button type="text" shape={props.preferenceData.buttonShape} size={"large"} icon={<i className={greetIcon}></i>}
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