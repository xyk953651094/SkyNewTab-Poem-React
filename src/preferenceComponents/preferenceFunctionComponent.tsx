import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Form,
    message,
    Modal,
    Radio,
    RadioChangeEvent,
    Row,
    Space,
    Switch, Typography
} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getPreferenceDataStorage,
    resetRadioColor, resetSwitchColor
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData} from "../typescripts/publicConstants";

const {Text} = Typography;

function PreferenceFunctionComponent(props: any) {
    const [displayResetPreferenceModal, setDisplayResetPreferenceModal] = useState(false);
    const [displayClearStorageModal, setDisplayClearStorageModal] = useState(false);
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
        resetRadioColor(event.target.value, ["bing", "google"], props.majorColor);
    }

    function buttonShapeRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({buttonShape: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换按钮形状");
        resetRadioColor(event.target.value, ["round", "default"], props.majorColor);
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
            message.success("已关闭简洁模式，一秒后刷新页面");
            refreshWindow();
        }
        resetSwitchColor("#simpleModeSwitch", checked, props.majorColor);
    }

    // 重置设置
    function resetPreferenceBtnOnClick() {
        setDisplayResetPreferenceModal(true);
    }

    function resetPreferenceOkBtnOnClick() {
        setDisplayResetPreferenceModal(true);
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        message.success("已重置设置，一秒后刷新页面");
        refreshWindow();
    }

    function resetPreferenceCancelBtnOnClick() {
        setDisplayResetPreferenceModal(false);
    }

    // 重置插件
    function clearStorageBtnOnClick() {
        setDisplayClearStorageModal(true);
    }

    function clearStorageOkBtnOnClick() {
        setDisplayClearStorageModal(true);
        localStorage.clear();
        message.success("已重置插件，一秒后刷新页面");
        refreshWindow();
    }

    function clearStorageCancelBtnOnClick() {
        setDisplayClearStorageModal(true);
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
        <>
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
                        <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                     onChange={searchEngineRadioOnChange}>
                            <Row>
                                <Col span={12}><Radio value={"bing"} id={"bing"}>必应</Radio></Col>
                                <Col span={12}><Radio value={"google"} id={"google"}>谷歌</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"buttonShape"} label={"按钮形状"}>
                        <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                     onChange={buttonShapeRadioOnChange}>
                            <Row>
                                <Col span={12}><Radio value={"round"} id={"round"}>圆形</Radio></Col>
                                <Col span={12}><Radio value={"default"} id={"default"}>方形</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"simpleMode"} label={"简洁模式"} valuePropName={"checked"}>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                id={"simpleModeSwitch"} onChange={simpleModeSwitchOnChange}/>
                    </Form.Item>
                    <Form.Item name={"clearStorageButton"} label={"危险设置"}>
                        <Space>
                            <Button type={"text"} shape={preferenceData.buttonShape} icon={<RedoOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={resetPreferenceBtnOnClick}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor)}}>
                                重置设置
                            </Button>
                            <Button type={"text"} shape={preferenceData.buttonShape} icon={<RedoOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={clearStorageBtnOnClick}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor)}}>
                                重置插件
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
            <Modal title={
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"确定重置设置？"}
                </Text>
            }
                   closeIcon={false}
                   centered
                   open={displayResetPreferenceModal}
                   onOk={resetPreferenceOkBtnOnClick}
                   onCancel={resetPreferenceCancelBtnOnClick}
                   destroyOnClose={true}
                   maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
            >
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"注意：所有设置项将被重置为默认值，确定重置吗？"}
                </Text>
            </Modal>
            <Modal title={
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"确定重置插件？"}
                </Text>
            }
                   closeIcon={false}
                   centered
                   open={displayClearStorageModal}
                   onOk={clearStorageOkBtnOnClick}
                   onCancel={clearStorageCancelBtnOnClick}
                   destroyOnClose={true}
                   maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
            >
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"注意：本地存储的所有数据将被清空，确定重置吗？"}
                </Text>
            </Modal>
        </>
    );
}

export default PreferenceFunctionComponent;