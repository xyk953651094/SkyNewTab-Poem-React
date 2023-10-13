import React, {useEffect, useState} from "react";
import {Alert, Button, Space, Card, Col, Form, message, Radio, RadioChangeEvent, Row, Switch, Typography} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {getFontColor, getPreferenceDataStorage} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const {Title, Paragraph} = Typography;

function PreferenceFunctionComponent(props: any) {
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());

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
    
    function buttonShapeRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({buttonShape: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换按钮形状");
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

    function displayAlertSwitchOnChange(checked: boolean) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({displayAlert: checked});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        if (checked) {
            message.success("已显示提示信息");
        } else {
            message.success("已隐藏提示信息");
        }
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
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                            <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                    onChange={simpleModeSwitchOnChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"displayAlert"} label={"提示信息"} valuePropName={"checked"}>
                            <Switch checkedChildren="已显示" unCheckedChildren="已隐藏" className={"poemFont"}
                                    onChange={displayAlertSwitchOnChange}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                    <Button type={"text"} shape={preferenceData.buttonShape} icon={<RedoOutlined/>}
                            onMouseOver={btnMouseOver} onMouseOut={btnMouseOut}
                            onClick={clearStorageBtnOnClick}
                            className={"poemFont"}
                            style={{color: getFontColor(props.minorColor)}}>
                        重置插件
                    </Button>
                </Form.Item>
                <Alert
                    message={
                        <Title level={5} className={"poemFont"}>{"提示信息"}</Title>
                    }
                    description={
                        <Paragraph className={"poemFont"}>
                            <ol>
                                <Space direction={"vertical"}>
                                    <li>重置插件将清空缓存恢复初始设置</li>
                                    <li>插件设置出现异常可尝试重置插件</li>
                                </Space>
                            </ol>
                        </Paragraph>
                    }
                    type="info"
                    style={{display: preferenceData.displayAlert ? "block" : "none"}}
                />
            </Form>
        </Card>
    );
}

export default PreferenceFunctionComponent;