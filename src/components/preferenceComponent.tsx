import React, {useEffect, useState} from "react";
import {Button, Drawer, Space, Tooltip} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {getFontColor} from "../typescripts/publicFunctions";
import {device} from "../typescripts/publicConstants";
import PreferenceLinkComponent from "../preferenceComponents/preferenceLinkComponent";
import PreferenceInfoComponent from "../preferenceComponents/preferenceInfoComponent";
import PreferenceFooterComponent from "../preferenceComponents/preferenceFooterComponent";
import PreferenceEmailComponent from "../preferenceComponents/preferenceEmailComponent";
import PreferenceFunctionComponent from "../preferenceComponents/preferenceFunctionComponent";
import PreferenceHeaderComponent from "../preferenceComponents/preferenceHeaderComponent";
import PreferenceProductComponent from "../preferenceComponents/preferenceProductComponent";

function PreferenceComponent(props: any) {
    const [displayDrawer, setDisplayDrawer] = useState(false);
    const [drawerPosition, setDrawerPosition] = useState<"right" | "bottom">("right");
    const [buttonShape, setButtonShape] = useState<"circle" | "default" | "round" | undefined>("round");

    function showDrawerBtnOnClick() {
        setDisplayDrawer(true);
    }

    function drawerOnClose() {
        setDisplayDrawer(false);
    }

    useEffect(() => {
        setButtonShape(props.preferenceData.buttonShape === "round" ? "circle" : "default");

        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            setDrawerPosition("bottom")
        }
    }, [props.preferenceData.buttonShape])

    return (
        <>
            <Tooltip title={"菜单栏"} placement={"bottomRight"} color={props.minorColor}>
                <Button type={"text"} shape={buttonShape} icon={<MenuOutlined style={{fontSize: "16px"}}/>} size={"large"}
                        onClick={showDrawerBtnOnClick}
                        id={"preferenceBtn"}
                        className={"componentTheme poemFont"}
                        style={{backgroundColor: props.minorColor, color: getFontColor(props.minorColor)}}
                />
            </Tooltip>
            <Drawer
                size={"default"}
                width={380}
                height={500}
                placement={drawerPosition}
                onClose={drawerOnClose}
                open={displayDrawer}
                closeIcon={false}
                headerStyle={{color: getFontColor(props.minorColor), borderBottomColor: getFontColor(props.minorColor)}}
                drawerStyle={{backgroundColor: props.minorColor}}
                maskStyle={{backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}
                title={
                    <PreferenceHeaderComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                }
                footer={
                    <PreferenceFooterComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                }
                footerStyle={{
                    backgroundColor: props.minorColor,
                    borderTopColor: getFontColor(props.minorColor),
                    textAlign: "center"
                }}
            >
                <Space direction={"vertical"} size={"large"}>
                    <PreferenceFunctionComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        getPreferenceData={props.getPreferenceData}
                    />
                    <PreferenceProductComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                    <PreferenceInfoComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                    <PreferenceEmailComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                    <PreferenceLinkComponent
                        majorColor={props.majorColor}
                        minorColor={props.minorColor}
                        preferenceData={props.preferenceData}
                    />
                </Space>
            </Drawer>
        </>
    );
}

export default PreferenceComponent;