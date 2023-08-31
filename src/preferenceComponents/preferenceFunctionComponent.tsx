import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, message, Radio, RadioChangeEvent, Row, Switch} from "antd";
import {DeleteOutlined, SettingOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {defaultPreferenceData} from "../typescripts/publicConstants";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

function PreferenceFunctionComponent(props: any) {
    const [preferenceData, setPreferenceData] = useState(initPreferenceData());

    function btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = props.majorColor;
        e.currentTarget.style.color = getFontColor(props.majorColor);
    }

    function btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(props.minorColor);
    }

    // 搜索引擎
    function searchEngineRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({searchEngine: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换搜索引擎");
    }

    // 重置设置
    function clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容，一秒后刷新页面");
        refreshWindow();
    }

    // 初始化偏好设置
    function initPreferenceData() {
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
            return defaultPreferenceData;
        }
        else {
            return JSON.parse(tempPreferenceData);
        }
    }

    // 修改偏好设置
    function modifyPreferenceData(data: Object) {
        return Object.assign({}, preferenceData, data);
    }

    function refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // 简洁模式
    function simpleModeSwitchOnChange(checked: boolean) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({simpleMode: checked});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        if (checked) {
            message.success("已开启简洁模式，一秒后刷新页面");
        } else {
            message.success("已关闭简洁模式，一秒后刷新页面");
        }
        refreshWindow();
    }

    useEffect(() => {

    }, []);

    return (
        <Card title={"功能设置"} size={"small"}
              extra={<SettingOutlined style={{color: getFontColor(props.minorColor)}}/>}
              style={{border: "1px solid " + getFontColor(props.minorColor)}}
              headStyle={{
                  backgroundColor: props.minorColor,
                  color: getFontColor(props.minorColor),
                  borderBottom: "2px solid " + getFontColor(props.minorColor),
                  fontFamily: "Times New Roman, cursive, sans-serif"
              }}
              bodyStyle={{backgroundColor: props.minorColor}}
        >
            <Form colon={false} initialValues={preferenceData}>
                <Form.Item name={"searchEngine"} label={"搜索引擎"}>
                    <Radio.Group buttonStyle={"solid"}
                                 onChange={searchEngineRadioOnChange}>
                        <Row>
                            <Col span={12}><Radio value={"baidu"}>Baidu</Radio></Col>
                            <Col span={12}><Radio value={"bing"}>Bing</Radio></Col>
                            <Col span={12}><Radio value={"google"}>Google</Radio></Col>
                            <Col span={12}><Radio value={"yandex"}>Yandex</Radio></Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭"
                            onChange={simpleModeSwitchOnChange}/>
                </Form.Item>
                <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                    <Button type={"text"} shape={"round"} icon={<DeleteOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            onClick={clearStorageBtnOnClick}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}}>
                        清空并重置所有内容
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default PreferenceFunctionComponent;