import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Input, Popover, Row, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {getFontColor, getSearchEngineDetail} from "../typescripts/publicFunctions";

const {Text} = Typography;

function SearchComponent(props: any) {
    const [display, setDisplay] = useState("block");
    const [searchEngineName, setSearchEngineName] = useState("Bing");
    const [searchEngineUrl, setSearchEngineUrl] = useState("https://www.bing.com/search?q=");

    function onPressEnter(e: any) {
        window.open(searchEngineUrl + e.target.value);
    }

    function changeSearchEngine() {
        const searchEngines = ["Baidu", "Bing", "Google", "Yandex"];
        let currentIndex = searchEngines.indexOf(searchEngineName);
        let nextIndex = 0;
        if (currentIndex !== searchEngines.length - 1) {
            nextIndex = currentIndex + 1;
        }

        setSearchEngineName(searchEngines[nextIndex]);
        setSearchEngineUrl(getSearchEngineDetail(searchEngines[nextIndex].toLowerCase()).searchEngineUrl)
    }

    useEffect(() => {
        let searchEngineDetail = getSearchEngineDetail(props.preferenceData.searchEngine);
        setDisplay(props.preferenceData.simpleMode ? "none" : "block");
        setSearchEngineName(searchEngineDetail.searchEngineName);
        setSearchEngineUrl(searchEngineDetail.searchEngineUrl);
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
            id={"searchInput"}
            className={"poemFont"}
            prefix={
                <Row align={"middle"}>
                    <Button type={"text"} size={"small"} className={"poemFont"} onClick={changeSearchEngine}
                            style={{
                                backgroundColor: props.minorColor,
                                color: getFontColor(props.minorColor)
                            }}>
                        {searchEngineName}
                    </Button>
                    <Divider type="vertical"/>
                </Row>
            }
            suffix={<SearchOutlined/>}
            placeholder={"按下 Enter 键搜索"}
            onPressEnter={onPressEnter}
            allowClear
        />
    );

    return (
        <Popover title={popoverTitle} content={popoverContent} placement={"bottomLeft"}
                 color={props.minorColor} overlayStyle={{width: "550px"}}>
            <Button type={"text"} shape={props.preferenceData.buttonShape === "round" ? "circle" : "default"}
                    icon={<SearchOutlined style={{fontSize: "16px"}}/>} size={"large"}
                    className={"componentTheme poemFont"}
                    style={{
                        cursor: "default",
                        display: display,
                        backgroundColor: props.minorColor,
                        color: getFontColor(props.minorColor)
                    }}
            />
        </Popover>
    );

}

export default SearchComponent;