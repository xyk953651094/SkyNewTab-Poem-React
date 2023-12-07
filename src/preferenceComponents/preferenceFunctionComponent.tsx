import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Col, Form, message, Radio, RadioChangeEvent, Row, Space, Switch, Typography} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {btnMouseOut, btnMouseOver, getFontColor, getPreferenceDataStorage} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Title, Paragraph} = Typography;

function PreferenceFunctionComponent(props: any) {
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());

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

    function buttonShapeRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({buttonShape: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换按钮形状");
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
            message.success("已开启简洁模式");
        } else {
            message.success("已关闭简洁模式");
        }
        // refreshWindow();
    }

    // 重置设置
    function clearStorageBtnOnClick() {
        localStorage.clear();
        message.success("已重置所有内容，一秒后刷新页面");
        refreshWindow();
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
                        <Row gutter={[0, 8]}>
                            <Col span={12}><Radio value={"baidu"}>Baidu</Radio></Col>
                            <Col span={12}><Radio value={"bing"}>Bing</Radio></Col>
                            <Col span={12}><Radio value={"google"}>Google</Radio></Col>
                            <Col span={12}><Radio value={"yandex"}>Yandex</Radio></Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name={"buttonShape"} label={"按钮形状"}>
                    <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                 onChange={buttonShapeRadioOnChange}>
                        <Row>
                            <Col span={12}><Radio value={"round"}>圆形</Radio></Col>
                            <Col span={12}><Radio value={"default"}>方形</Radio></Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                    <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                            onChange={simpleModeSwitchOnChange}/>
                </Form.Item>
                <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                    <Button type={"text"} shape={preferenceData.buttonShape} icon={<RedoOutlined/>}
                            onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                            onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                            onClick={clearStorageBtnOnClick}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}}>
                        重置插件
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default PreferenceFunctionComponent;