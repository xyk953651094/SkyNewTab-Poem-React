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
    Switch, Typography, Select
} from "antd";
import {RedoOutlined, SettingOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getPreferenceDataStorage, getTimeDetails,
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData} from "../typescripts/publicConstants";

const {Text} = Typography;

function MenuPreferenceComponent(props: any) {
    const [formDisabled, setFormDisabled] = useState(false);
    const [displayResetPreferenceModal, setDisplayResetPreferenceModal] = useState(false);
    const [displayClearStorageModal, setDisplayClearStorageModal] = useState(false);
    const [preferenceData, setPreferenceData] = useState(getPreferenceDataStorage());
    const [lastPoemRequestTime, setLastPoemRequestTime] = useState("暂无信息");

    // 搜索引擎
    function searchEngineRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({searchEngine: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换搜索引擎");
        // resetRadioColor(event.target.value, ["bing", "google"], props.majorColor);
    }

    function buttonShapeRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({buttonShape: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换按钮形状");
        // resetRadioColor(event.target.value, ["round", "default"], props.majorColor);
    }

    // 诗词主题
    function poemTopicsRadioOnChange(event: RadioChangeEvent) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({poemTopic: event.target.value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已更换诗词主题，下次切换诗词时生效");
    }

    // 智能主题
    function autoTopicSwitchOnChange(checked: boolean) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({autoTopic: checked, changePoemTime: "3600000"});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            localStorage.removeItem("lastPoemRequestTime");  // 重置请求时间
            return newPreferenceData;
        });
        if (checked) {
            message.success("已开启自动主题，一秒后刷新页面");
        } else {
            message.success("已关闭自动主题，一秒后刷新页面");
        }
        setFormDisabled(true);
        refreshWindow();
    }

    // 切换间隔
    function changePoemTimeOnChange(value: string) {
        setFormDisabled(true);
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({changePoemTime: value});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        message.success("已修改切换间隔，一秒后刷新页面");
        refreshWindow();
    }

    // 极简模式
    function simpleModeSwitchOnChange(checked: boolean) {
        setPreferenceData((preferenceData: PreferenceDataInterface) => {
            let newPreferenceData = modifyPreferenceData({simpleMode: checked});
            props.getPreferenceData(newPreferenceData);
            localStorage.setItem("preferenceData", JSON.stringify(newPreferenceData));
            return newPreferenceData;
        });
        if (checked) {
            message.success("已开启极简模式");
        } else {
            message.success("已关闭极简模式，一秒后刷新页面");
            setFormDisabled(true);
            refreshWindow();
        }
        // resetSwitchColor("#simpleModeSwitch", checked, props.majorColor);
    }

    // 重置设置
    function resetPreferenceBtnOnClick() {
        let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
        if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
            message.error("操作过于频繁，请稍后再试");
        } else {
            setDisplayResetPreferenceModal(true);
        }
    }

    function resetPreferenceOkBtnOnClick() {
        setDisplayResetPreferenceModal(true);
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
        message.success("已重置设置，一秒后刷新页面");
        setFormDisabled(true);
        refreshWindow();
    }

    function resetPreferenceCancelBtnOnClick() {
        setDisplayResetPreferenceModal(false);
    }

    // 重置插件
    function clearStorageBtnOnClick() {
        let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
        if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
            message.error("操作过于频繁，请稍后再试");
        } else {
            setDisplayClearStorageModal(true);
        }
    }

    function clearStorageOkBtnOnClick() {
        setDisplayClearStorageModal(true);
        localStorage.clear();
        localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
        message.success("已重置插件，一秒后刷新页面");
        setFormDisabled(true);
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
        let lastPoemRequestTimeStorage = localStorage.getItem("lastPoemRequestTime");
        if (lastPoemRequestTimeStorage !== null) {
            setLastPoemRequestTime(getTimeDetails(new Date(parseInt(lastPoemRequestTimeStorage))).showDetail);
        }
    }, []);

    return (
        <>
            <Card title={"偏好设置"} size={"small"}
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
                <Form colon={false} initialValues={preferenceData} disabled={formDisabled}>
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
                    <Form.Item name={"poemTopic"} label={"诗词主题"}>
                        <Radio.Group buttonStyle={"solid"} style={{width: "100%"}}
                                     disabled={preferenceData.autoTopic} onChange={poemTopicsRadioOnChange}>
                            <Row gutter={[0, 8]}>
                                <Col span={12}><Radio value={"all"} id={"all"}>随机</Radio></Col>
                                <Col span={12}><Radio value={"shuqing"} id={"shuqing"}>抒情</Radio></Col>
                                <Col span={12}><Radio value={"siji"} id={"siji"}>四季</Radio></Col>
                                <Col span={12}><Radio value={"shanshui"} id={"shanshui"}>山水</Radio></Col>
                                <Col span={12}><Radio value={"tianqi"} id={"tianqi"}>天气</Radio></Col>
                                <Col span={12}><Radio value={"renwu"} id={"renwu"}>人物</Radio></Col>
                                <Col span={12}><Radio value={"rensheng"} id={"rensheng"}>人生</Radio></Col>
                                <Col span={12}><Radio value={"shenghuo"} id={"shenghuo"}>生活</Radio></Col>
                                <Col span={12}><Radio value={"jieri"} id={"jieri"}>节日</Radio></Col>
                                <Col span={12}><Radio value={"dongwu"} id={"dongwu"}>动物</Radio></Col>
                                <Col span={12}><Radio value={"zhiwu"} id={"zhiwu"}>植物</Radio></Col>
                                <Col span={12}><Radio value={"shiwu"} id={"shiwu"}>食物</Radio></Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={"autoTopic"} label={"智能主题"} valuePropName={"checked"}
                               extra={preferenceData.autoTopic ? "已禁用诗词主题与部分切换间隔" : ""}>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                id={"autoTopicSwitch"} onChange={autoTopicSwitchOnChange}/>
                    </Form.Item>
                    <Form.Item name={"changePoemTime"} label={"切换间隔"}
                               extra={"上次切换：" + lastPoemRequestTime}>
                        <Select popupClassName={"poemFont"} style={{width: 170}} onChange={changePoemTimeOnChange}
                                options={[
                                    {value: "900000", label: "每隔 15 分钟", disabled:preferenceData.autoTopic},
                                    {value: "1800000", label: "每隔 30 分钟", disabled:preferenceData.autoTopic},
                                    {value: "3600000", label: "每隔 1 小时"},
                                    {value: "21600000", label: "每隔 6 小时"},
                                    {value: "43200000", label: "每隔 12 小时"},
                                    {value: "86400000", label: "每隔 1 天"},
                                ]}
                        />
                    </Form.Item>
                    <Form.Item name={"simpleMode"} label={"极简模式"} valuePropName={"checked"}>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                id={"simpleModeSwitch"} onChange={simpleModeSwitchOnChange}/>
                    </Form.Item>
                    <Form.Item name={"clearStorageButton"} label={"危险设置"} extra={"出现异常时可尝试重置设置或插件"}>
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
                    styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"注意：所有设置项将被重置为默认值"}
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
                    styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
            >
                <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                    {"注意：所有设置项将被重置为默认值，所有数据将被清空"}
                </Text>
            </Modal>
        </>
    );
}

export default MenuPreferenceComponent;