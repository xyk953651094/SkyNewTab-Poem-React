import React, {useEffect, useState} from "react";
import {Button, Popover, Input, Avatar, Row, Col, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {getFontColor, getSearchEngineDetail} from "../typescripts/publicFunctions";

const {Text} = Typography;

function SearchComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");
    const [searchEngineIconUrl, setSearchEngineIconUrl] = useState("https://www.bing.com/favicon.ico");
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");

    function onPressEnter(e: any) {
        window.open(searchEngineUrl + e.target.value);
    }

    useEffect(() => {
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setSearchEngineUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineUrl);
        setSearchEngineIconUrl(getSearchEngineDetail(props.preferenceData.searchEngine).searchEngineIconUrl);
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");
    }, [props.preferenceData.buttonShape, props.preferenceData.searchEngine, props.preferenceData.simpleMode])

    const popoverTitle = (
        <Row align={"middle"}>
            <Col span={24}>
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>{"搜索栏"}</Text>
            </Col>
        </Row>
    );

    const popoverContent = (
        <Input
            className={"poemFont"}
            prefix={<Avatar size={"small"} src={searchEngineIconUrl} alt={"图标"}/>}
            suffix={<SearchOutlined/>}
            placeholder={"按下 Enter 键搜索"}
            onPressEnter={onPressEnter}
            allowClear
        />
    );

    return (
        <Popover title={popoverTitle} content={popoverContent} placement={"bottomLeft"}
                 color={props.minorColor} overlayStyle={{width: "550px"}}>
            <Button type={"text"} shape={buttonShape} icon={<SearchOutlined />} size={"large"}
                    id={"dailyBtn"}
                    className={"componentTheme poemFont"}
                    style={{
                        cursor: "default",
                        display: display,
                        backgroundColor: props.minorColor,
                        color: getFontColor(props.minorColor)
                    }}
            >
            </Button>
        </Popover>
    );

}

export default SearchComponent;