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
    Switch, Typography, Select, Upload, ColorPicker
} from "antd";
import {BgColorsOutlined, RedoOutlined, SettingOutlined, ImportOutlined, ExportOutlined} from "@ant-design/icons";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getPreferenceDataStorage, getTimeDetails,
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import {defaultPreferenceData, device} from "../typescripts/publicConstants";
import {RcFile} from "antd/es/upload";
import type { ColorPickerProps, GetProp } from 'antd';
type Color = GetProp<ColorPickerProps, 'value'>;

const {Text} = Typography;

function MenuPreferenceComponent(props: any) {
    const [formDisabled, setFormDisabled] = useState(false);
    const [displayCustomThemeModal, setDisplayCustomThemeModal] = useState(false);
    const [customThemeState, setCustomThemeState] = useState(false);
    const [customMajorColor, setCustomMajorColor] = useState<Color>(props.majorColor);
    const [customMinorColor, setCustomMinorColor] = useState<Color>(props.minorColor);
    const [customSvgColor0, setCustomSvgColor0] = useState<Color>(props.svgColors[0]);
    const [customSvgColor1, setCustomSvgColor1] = useState<Color>(props.svgColors[1]);
    const [customSvgColor2, setCustomSvgColor2] = useState<Color>(props.svgColors[2]);
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

    // 自定颜色
    function customThemeBtnOnClick() {
        setDisplayCustomThemeModal(true);
    }

    function customThemeOkBtnOnClick() {
        setDisplayCustomThemeModal(false);
        const customTheme = {
            majorColor: customMajorColor,
            minorColor: customMinorColor,
            svgColors: [customSvgColor0, customSvgColor1, customSvgColor2]
        }

        setCustomThemeState(true);
        localStorage.setItem("customThemeState", JSON.stringify(true));
        localStorage.setItem("theme", JSON.stringify(customTheme));
        message.success("已启用自定颜色，一秒后刷新页面");
        refreshWindow();
    }

    function customThemeCancelBtnOnClick() {
        setDisplayCustomThemeModal(false);
    }

    function disableCustomThemeBtnOnClick() {
        setDisplayCustomThemeModal(false);
        setCustomThemeState(false);
        localStorage.setItem("customThemeState", JSON.stringify(false));
        localStorage.removeItem("theme");
        message.success("已关闭自定颜色，一秒后刷新页面");
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

    // 导入数据
    function importDataBtnOnClick(file: RcFile) {
        if (device !== "") {
            message.error("暂不支持移动端");
        } else {
            if (file.name.indexOf("云开诗词新标签页") === 0) {
                file.text().then(result => {
                    let importData = JSON.parse(result);
                    if (importData) {
                        localStorage.setItem("daily", JSON.stringify(importData.dailyList ? importData.dailyList : []));
                        localStorage.setItem("dailyNotification", JSON.stringify(importData.dailyNotification ? importData.dailyNotification : false));
                        localStorage.setItem("todos", JSON.stringify(importData.todoList ? importData.todoList : []));
                        localStorage.setItem("todoNotification", JSON.stringify(importData.todoNotification ? importData.todoNotification : false));
                        localStorage.setItem("filterList", JSON.stringify(importData.filterList ? importData.filterList : []));
                        localStorage.setItem("linkList", JSON.stringify(importData.linkList ? importData.linkList : []));
                        localStorage.setItem("preferenceData", JSON.stringify(importData.preferenceData ? importData.preferenceData : defaultPreferenceData));

                        setFormDisabled(true);
                        message.success("导入数据成功，一秒后刷新页面");
                        refreshWindow();
                    } else {
                        message.error("导入数据失败");
                    }
                })
            } else {
                message.error("请选择正确的文件");
            }
        }
        return false;
    }

    // 导出数据
    function exportDataBtnOnClick() {
        if (device !== "") {
            message.error("暂不支持移动端");
        } else {
            // 倒数日
            let tempDailyList = [];
            let dailyListStorage = localStorage.getItem("daily");
            if (dailyListStorage) {
                tempDailyList = JSON.parse(dailyListStorage);
            }

            let tempDailyNotification = false;
            let dailyNotificationStorage = localStorage.getItem("dailyNotification");
            if (dailyNotificationStorage) {
                tempDailyNotification = JSON.parse(dailyNotificationStorage);
            }

            // 待办事项
            let tempTodoList = [];
            let todoListStorage = localStorage.getItem("todos");
            if (todoListStorage) {
                tempTodoList = JSON.parse(todoListStorage);
            }

            let tempTodoNotification = false;
            let todoNotificationStorage = localStorage.getItem("todoNotification");
            if (todoNotificationStorage) {
                tempTodoNotification = JSON.parse(todoNotificationStorage);
            }

            // 专注模式过滤名单
            let tempFilterList = [];
            let filterListStorage = localStorage.getItem("filterList");
            if (filterListStorage) {
                tempFilterList = JSON.parse(filterListStorage);
            }

            // 快捷链接
            let tempLinkList = [];
            let linkListStorage = localStorage.getItem("linkList");
            if (linkListStorage) {
                tempLinkList = JSON.parse(linkListStorage);
            }

            let exportData = {
                title: "云开新标签页",
                attention: "请不要修改本文件的名称和内容",
                dailyList: tempDailyList,
                dailyNotification: tempDailyNotification,
                todoList: tempTodoList,
                todoNotification: tempTodoNotification,
                filterList: tempFilterList,
                linkList: tempLinkList,
                preferenceData: preferenceData,
            }

            let file = new Blob([JSON.stringify(exportData)], {type: "application/json"});
            const objectURL = URL.createObjectURL(file);
            let a = document.createElement("a");
            a.href = objectURL;
            a.download = "云开诗词新标签页.json";
            a.click();
            URL.revokeObjectURL(objectURL);
            message.success("导出数据成功");
        }
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
        setDisplayResetPreferenceModal(false);
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
        setDisplayClearStorageModal(false);
        localStorage.clear();
        localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
        message.success("已重置插件，一秒后刷新页面");
        setFormDisabled(true);
        refreshWindow();
    }

    function clearStorageCancelBtnOnClick() {
        setDisplayClearStorageModal(false);
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
        let tempCustomThemeState = false;
        let customThemeStateStorage = localStorage.getItem("customThemeState");
        if (customThemeStateStorage) {
            tempCustomThemeState = JSON.parse(customThemeStateStorage);
            setCustomThemeState(tempCustomThemeState);
        } else {
            localStorage.setItem("customThemeState", JSON.stringify(false));
        }

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
                      fontFamily: "Times New Roman, cursive, serif"
                  }}
                  bodyStyle={{backgroundColor: props.minorColor}}
            >
                <Form colon={false} initialValues={preferenceData} disabled={formDisabled}>
                    <Form.Item name={"searchEngine"} label={"搜索引擎"} style={{display: ["iPhone", "Android"].indexOf(device) === -1 ? "block" : "none"}}>
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
                    <Form.Item name={"poemTopic"} label={"诗词主题"}
                               extra={preferenceData.autoTopic ? "已禁用诗词主题与部分切换间隔" : "已启用诗词主题"}>
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
                               extra={preferenceData.autoTopic ? "已启用智能主题" : "已禁用智能主题"}>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                id={"autoTopicSwitch"} onChange={autoTopicSwitchOnChange}/>
                    </Form.Item>
                    <Form.Item name={"changePoemTime"} label={"切换间隔"}
                               extra={"上次切换：" + lastPoemRequestTime}>
                        <Select className={"poemFont"} popupClassName={"poemFont"} style={{width: 170}} onChange={changePoemTimeOnChange}
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
                    <Form.Item name={"customTheme"} label={"自定颜色"} style={{display: ["iPhone", "Android"].indexOf(device) === -1 ? "block" : "none"}}
                               extra={customThemeState ? "已启用自定义主题颜色" : ""}>
                        <Button type={"text"} shape={preferenceData.buttonShape} icon={<BgColorsOutlined />}
                                onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                className={"poemFont"}
                                onClick={customThemeBtnOnClick}
                                style={{color: getFontColor(props.minorColor)}}>
                            自定义插件主题颜色
                        </Button>
                    </Form.Item>
                    <Form.Item name={"simpleMode"} label={"极简模式"} valuePropName={"checked"} style={{display: ["iPhone", "Android"].indexOf(device) === -1 ? "block" : "none"}}>
                        <Switch checkedChildren="已开启" unCheckedChildren="已关闭" className={"poemFont"}
                                id={"simpleModeSwitch"} onChange={simpleModeSwitchOnChange}/>
                    </Form.Item>
                    <Form.Item name={"manageDataButton"} label={"数据管理"} style={{display: ["iPhone", "Android"].indexOf(device) === -1 ? "block" : "none"}}>
                        <Space>
                            <Upload accept={"application/json"}
                                    maxCount={1}
                                    beforeUpload={(file) => {importDataBtnOnClick(file)}}
                                    showUploadList={false}>
                                <Button type={"text"} shape={preferenceData.buttonShape} icon={<ImportOutlined/>}
                                        onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                        onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                        className={"poemFont"}
                                        style={{color: getFontColor(props.minorColor)}}>
                                    导入数据
                                </Button>
                            </Upload>
                            <Button type={"text"} shape={preferenceData.buttonShape} icon={<ExportOutlined/>}
                                    onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                                    onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                                    onClick={exportDataBtnOnClick}
                                    className={"poemFont"}
                                    style={{color: getFontColor(props.minorColor)}}>
                                导出数据
                            </Button>
                        </Space>
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
                <Row align={"middle"}>
                    <Col span={12}>
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"自定义插件主题颜色"}
                        </Text>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <BgColorsOutlined />
                    </Col>
                </Row>
            }
                   closeIcon={false}
                   centered
                   open={displayCustomThemeModal}
                   destroyOnClose={true}
                   styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
                   footer={[
                       <Button type={"text"} shape={preferenceData.buttonShape} key={"closeCustomPoem"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={disableCustomThemeBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor), display: customThemeState ? "inline-block" : "none"}} >
                           {"恢复默认主题颜色"}
                       </Button>,
                       <Button type={"text"} shape={preferenceData.buttonShape} key={"modalCancel"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={customThemeCancelBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor)}} >
                           {"取消"}
                       </Button>,
                       <Button type={"text"} shape={preferenceData.buttonShape} key={"modalOk"}
                               onMouseOver={(e) => btnMouseOver(props.majorColor, e)}
                               onMouseOut={(e) => btnMouseOut(props.minorColor, e)}
                               onClick={customThemeOkBtnOnClick}
                               className={"poemFont"}
                               style={{color: getFontColor(props.minorColor)}} >
                           {"确定"}
                       </Button>
                   ]}
            >
                <Form>
                    <Form.Item label={"主要颜色"} name={"mainColor"} extra={"影响背景颜色与按钮颜色"}>
                        <Space>
                            <ColorPicker value={customMajorColor} onChange={(value: Color, hex: string) => setCustomMajorColor(hex)} className={"poemFont"} showText disabledAlpha/>
                            <ColorPicker value={customMinorColor} onChange={(value: Color, hex: string) => setCustomMinorColor(hex)} className={"poemFont"} showText disabledAlpha/>
                        </Space>
                    </Form.Item>
                    <Form.Item label={"SVG颜色"} name={"svgColor"} extra={"影响左上角月亮与底部波浪"}>
                        <Space>
                            <ColorPicker value={customSvgColor0} onChange={(value: Color, hex: string) => setCustomSvgColor0(hex)} className={"poemFont"} showText disabledAlpha/>
                            <ColorPicker value={customSvgColor1} onChange={(value: Color, hex: string) => setCustomSvgColor1(hex)} className={"poemFont"} showText disabledAlpha/>
                            <ColorPicker value={customSvgColor2} onChange={(value: Color, hex: string) => setCustomSvgColor2(hex)} className={"poemFont"} showText disabledAlpha/>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title={
                <Row align={"middle"}>
                    <Col span={12}>
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"确定重置设置？"}
                        </Text>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <RedoOutlined/>
                    </Col>
                </Row>
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
                <Row align={"middle"}>
                    <Col span={12}>
                        <Text className={"poemFont"} style={{color: getFontColor(props.minorColor)}}>
                            {"确定重置插件？"}
                        </Text>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <RedoOutlined/>
                    </Col>
                </Row>
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