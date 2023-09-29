import React, {useEffect, useState} from "react";
import {Button, Popover, Input, Row, Col, Typography, Divider} from "antd";
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
            className={"poemFont"}
            prefix={
                <Row align={"middle"}>
                    <Button type={"text"} size={"small"} className={"poemFont"}
                            style={{
                                cursor: "default",
                                backgroundColor: props.minorColor,
                                color: getFontColor(props.minorColor)
                            }}>
                        {searchEngineName}
                    </Button>
                    <Divider type="vertical" />
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
            <Button type={"text"} shape={props.preferenceData.buttonShape} icon={<SearchOutlined />} size={"large"}
                    id={"dailyBtn"}
                    className={"componentTheme poemFont"}
                    style={{
                        display: display,
                        backgroundColor: props.minorColor,
                        color: getFontColor(props.minorColor)
                    }}
            >
                {"搜索"}
            </Button>
        </Popover>
    );

}

export default SearchComponent;